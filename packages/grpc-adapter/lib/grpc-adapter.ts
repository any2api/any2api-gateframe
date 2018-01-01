import * as grpc from 'grpc';
import * as ProtoBuf from 'protobufjs';
import { Observable, Subject } from '@reactivex/rxjs';

import { Adapter, Callable, AdapterInitResult, GrpcRequestType,
    forEachMethodInProto, getMethodInfo, MethodInfo } from '@any2api/gateway-common';
import { GrpcAdapterConfig } from './grpc-adapter-config';

export class GrpcAdapter implements Adapter {
    private server: grpc.Server;

    private handlerMap = {
        unary: this.unary,
        client_stream: this.clientStreaming,
        server_stream: this.serverStreaming,
        bidi: this.bidiStreaming
    };

    constructor(private settings: GrpcAdapterConfig, private upstream: Callable) {
        this.server = new grpc.Server();
    }

    public register = async (proto: ProtoBuf.Namespace) => {

        proto.resolveAll();

        forEachMethodInProto(proto, (m) => this.registerMethod(m));

        if (this.settings.insecure) {
            this.server.bind(this.settings.port, grpc.ServerCredentials.createInsecure());
        } else {
            throw new Error('Only insecure credentials are supported at the moment.');
        }

        this.server.start();

        return {
            host: 'localhost',
            port: this.settings.port
        };
    }

    public stop(): Promise<void> {
        return new Promise((resolve) => {
            this.server.tryShutdown(resolve);
        });
    }

    private registerMethod(definition: ProtoBuf.Method) {
        const info = getMethodInfo(definition);

        const handler = this.handlerMap[info.type].bind(this, info);

        this.server.register(
            `/${info.name.namespace}/${info.name.name}`,
            handler,
            info.responseSerialize,
            info.requestDeserialize,
            info.type);
    }

    private unary(info: MethodInfo, call: grpc.ServerUnaryCall, callback: grpc.sendUnaryData) {
        let result;
        
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: Observable.of(call.request),
            metadata: call.metadata,
            type: GrpcRequestType.Unary,
            serialize: info.requestSerialize,
            deserialize: info.responseDeserialize
        })
            .do((c) => call.sendMetadata(c.metadata))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => result = r,
                (e: grpc.ServiceError) => callback(e, result, e.metadata),
                () => callback(null, result));
    }

    private clientStreaming(info: MethodInfo, call: grpc.ServerReadableStream, callback: grpc.sendUnaryData) {
        const requestSubject = new Subject();
    
        let result;
        
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: call.metadata,
            type: GrpcRequestType.Unary,
            serialize: info.requestSerialize,
            deserialize: info.responseDeserialize
        })
            .do((c) => call.sendMetadata(c.metadata))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => result = r,
                (e: grpc.ServiceError) => callback(e, result, e.metadata),
                () => callback(null, result, ));

        call.on('data', (req) => requestSubject.next(req));
    }

    private serverStreaming(info: MethodInfo, call: grpc.ServerWriteableStream) {
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: Observable.of(call.request),
            metadata: call.metadata,
            type: GrpcRequestType.Unary,
            serialize: info.requestSerialize,
            deserialize: info.responseDeserialize
        })
            .do((c) => call.sendMetadata(c.metadata))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => call.write(r),
                (e: grpc.ServiceError) => call.emit('error', e, e.metadata),
                () => call.end());
    }

    private bidiStreaming(info: MethodInfo, call: grpc.ServerDuplexStream) {
        const requestSubject = new Subject();
    
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: (call as any).metadata,
            type: GrpcRequestType.Unary,
            serialize: info.requestSerialize,
            deserialize: info.responseDeserialize
        })
            .do((c) => call.sendMetadata(c.metadata))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => call.write(r),
                (e: grpc.ServiceError) => call.emit('error', e, e.metadata),
                () => call.end());

        call.on('data', (req) => requestSubject.next(req));
    }

    public gracefullShutdown(): Promise<void> {
        return new Promise((resolve) => this.server.tryShutdown(resolve));
    }
}
