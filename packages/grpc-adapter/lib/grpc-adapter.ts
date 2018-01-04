import * as grpc from 'grpc';
import * as ProtoBuf from 'protobufjs';
import { Observable, Subject } from '@reactivex/rxjs';

import { Adapter, Callable, AdapterInitResult, GrpcMethodType,
    forEachMethodInProto, getProtoMethodInfo, MethodInfo,
    LazyMessageAccesor, MessageAccessor } from '@any2api/gateway-common';
import { GrpcAdapterConfig } from './grpc-adapter-config';
import { Metadata } from 'grpc';

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
        const info = getProtoMethodInfo(definition);

        const handler = this.handlerMap[info.type].bind(this, info);

        this.server.register(
            `/${info.name.namespace}/${info.name.name}`,
            handler,
            (accessor) => accessor.getBinary(),
            (buffer) => new LazyMessageAccesor(definition.resolvedRequestType, buffer),
            info.type);
    }

    private unary(info: MethodInfo, call: grpc.ServerUnaryCall, callback: grpc.sendUnaryData) {
        let result;

        (call as any).on('error', console.error);
        
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: Observable.of(call.request),
            metadata: call.metadata,
            type: GrpcMethodType.Unary,
            responseType: info.responseType
        })
            .do((c) => call.sendMetadata(c.header))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => result = r,
                (e: grpc.ServiceError) => callback(e, result, e.metadata),
                () => callback(null, result));
    }

    private clientStreaming(info: MethodInfo, call: grpc.ServerReadableStream, callback: grpc.sendUnaryData) {
        const requestSubject = new Subject<LazyMessageAccesor<{}>>();
    
        let result;
        
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: call.metadata,
            type: GrpcMethodType.ClientStreaming,
            responseType: info.responseType
        })
            .do((c) => call.sendMetadata(c.header))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => result = r,
                (e: grpc.ServiceError) => callback(e, result, e.metadata),
                () => callback(null, result));

        // Observable.fromEvent(call, 'data').subscribe(requestSubject);
        call.on('data', (req: LazyMessageAccesor<{}>) => requestSubject.next(req));
        call.on('end', () => requestSubject.complete());
    }

    private serverStreaming(info: MethodInfo, call: grpc.ServerWriteableStream) {
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: Observable.of(call.request),
            metadata: call.metadata,
            type: GrpcMethodType.ServerStreaming,
            responseType: info.responseType
        })
            .do((c) => call.sendMetadata(c.header))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => call.write(r),
                (e: grpc.ServiceError) => call.emit('error', e, e.metadata),
                () => call.end());
    }

    private bidiStreaming(info: MethodInfo, call: grpc.ServerDuplexStream) {
        const requestSubject = new Subject<LazyMessageAccesor<{}>>();
    
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: (call as any).metadata,
            type: GrpcMethodType.BidirectionalStreaming,
            responseType: info.responseType
        })
            .do((c) => call.sendMetadata(c.header))
            .flatMap((c) => c.responseObservable)
            .subscribe(
                (r) => call.write(r),
                (e: grpc.ServiceError) => call.emit('error', e, e.metadata),
                () => call.end());

        call.on('data', (req: LazyMessageAccesor<{}>) => requestSubject.next(req));
        call.on('end', () => requestSubject.complete());
    }

    public gracefullShutdown(): Promise<void> {
        return new Promise((resolve) => this.server.tryShutdown(resolve));
    }
}
