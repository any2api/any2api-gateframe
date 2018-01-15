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

/**
 * This interface defines the information that is passed through the execution chain.
 * The intermediaries can change elements (or even create new instances)
 * before calling the next element in the chain.
 */
export interface RequestParameters {
    method: { namespace: string, name: string };
    type: GrpcMethodType;
    requestObservable: Observable<MessageAccessor<{}>>;
    responseType: ProtoBuf.Type;
    metadata?: Metadata;
    callOptions?: CallOptions;
}

/**
 * This interface defines the information that is passed back through the execution chain.
 * The intermediaries can change elements before returning it to the caller.
 */
export interface Call {
    header: Metadata;
    responseObservable: Observable<MessageAccessor<{}>>;
    status: Observable<StatusObject>;

    cancel();
    getPeer(): string;
}
