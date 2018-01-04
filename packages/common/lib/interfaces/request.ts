import { Metadata, serialize, deserialize, CallOptions, ServiceError, StatusObject } from 'grpc';
import { Observable } from '@reactivex/rxjs';
import * as ProtoBuf from 'protobufjs';
import { MessageAccessor } from '../index';

export enum GrpcMethodType {
    Unary = 'unary',
    ClientStreaming = 'client_stream',
    ServerStreaming = 'server_stream',
    BidirectionalStreaming = 'bidi'
}

export interface RequestParameters {
    method: { namespace: string, name: string };
    type: GrpcMethodType;
    requestObservable: Observable<MessageAccessor<{}>>;
    responseType: ProtoBuf.Type;
    metadata?: Metadata;
    callOptions?: CallOptions;
}

export interface Call {
    header: Metadata;
    responseObservable: Observable<MessageAccessor<{}>>;
    status: Observable<StatusObject>;

    cancel();
    getPeer(): string;
}
