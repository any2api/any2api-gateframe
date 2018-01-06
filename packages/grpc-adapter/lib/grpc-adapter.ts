import * as grpc from 'grpc';
import * as ProtoBuf from 'protobufjs';
import { Observable, Subject } from '@reactivex/rxjs';

import { Adapter, Callable, AdapterInitResult, GrpcMethodType,
    forEachMethodInProto, getProtoMethodInfo, MethodInfo,
    LazyMessageAccesor, MessageAccessor, Call } from '@any2api/gateway-common';
import { GrpcAdapterConfig } from './grpc-adapter-config';
import { Metadata, StatusObject } from 'grpc';

function serverStreamingHandler(downCall: grpc.ServerWriteableStream, upCall: Call) {
    downCall.sendMetadata(upCall.header);

    let responsesCompleted = false;
    let status;

    const sendStatus = () => {
        if (responsesCompleted && status) {
            if (status.code === grpc.status.OK) {
                downCall.end(status.metadata);
            } else {
                downCall.emit('error', { name: status.details, ...status });
            }
        }
    };

    upCall.responseObservable.subscribe(
        (r) => downCall.write(r),
        (e) => downCall.emit('error', e),
        () => { responsesCompleted = true; sendStatus(); });
    
    upCall.status.subscribe((s) => { status = s; sendStatus(); });
}

function callbackHandler(downCall: grpc.ServerUnaryCall, callback: grpc.sendUnaryData, upCall: Call) {
    downCall.sendMetadata(upCall.header);
    Observable.zip(upCall.responseObservable, upCall.status)
        .subscribe(
            ([r, status]) => {
                if (status.code === grpc.status.OK) {
                    callback(null, r, status.metadata);
                } else {
                    callback({ name: status.details, ...status } as any, null, status.metadata);
                }
            },
            (e) => callback(e, null));
}

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
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: Observable.of(call.request),
            metadata: call.metadata,
            type: GrpcMethodType.Unary,
            responseType: info.responseType
        }).subscribe(callbackHandler.bind(this, call, callback));
    }

    private clientStreaming(info: MethodInfo, call: grpc.ServerReadableStream, callback: grpc.sendUnaryData) {
        const requestSubject = new Subject<LazyMessageAccesor<{}>>();
        
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: call.metadata,
            type: GrpcMethodType.ClientStreaming,
            responseType: info.responseType
        }).subscribe(callbackHandler.bind(this, call, callback));

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
        }).subscribe(serverStreamingHandler.bind(this, call), (e) => call.emit('error', e));
    }

    private bidiStreaming(info: MethodInfo, call: grpc.ServerDuplexStream) {
        const requestSubject = new Subject<LazyMessageAccesor<{}>>();
    
        const upstreamObservable = this.upstream.makeRequest({
            method: info.name,
            requestObservable: requestSubject,
            metadata: (call as any).metadata,
            type: GrpcMethodType.BidirectionalStreaming,
            responseType: info.responseType
        }).subscribe(serverStreamingHandler.bind(this, call), (e) => call.emit('error', e));

        call.on('data', (req: LazyMessageAccesor<{}>) => requestSubject.next(req));
        call.on('end', () => requestSubject.complete());
    }

    public gracefullShutdown(): Promise<void> {
        return new Promise((resolve) => this.server.tryShutdown(resolve));
    }
}
