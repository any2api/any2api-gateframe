import { Metadata, serialize, deserialize, CallOptions, ServiceError } from 'grpc';
import { Observable } from '@reactivex/rxjs';

export enum GrpcRequestType {
    Unary = 'unary',
    ClientStreaming = 'client_stream',
    ServerStreaming = 'server_stream',
    BidirectionalStreaming = 'bidi'
}

export interface RequestParameters {
    method: { namespace: string, name: string };
    type: GrpcRequestType;
    requestObservable: Observable<{ [props: string]: any }>;
    metadata?: Metadata;
    serialize: serialize;
    deserialize: deserialize;
    callOptions?: CallOptions;
}

export interface Call {
    responseObservable: Observable<{ [props: string]: any }>;
    metadata: Metadata;

    cancel();
    getPeer(): string;
}
