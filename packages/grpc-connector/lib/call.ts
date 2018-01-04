import { Observable, Subject } from '@reactivex/rxjs';
import {
    Metadata, StatusObject, ClientUnaryCall, ClientReadableStream, ClientWritableStream, ClientDuplexStream,
    requestCallback, handleServerStreamingCall, serialize, deserialize, CallOptions
} from 'grpc';
import { EventEmitter } from 'events';

import { Call, MessageAccessor } from '@any2api/gateway-common';

export interface RequestParameters {
    method: string;
    type: GrpcRequestType;
    requestObservable: Observable<{ [props: string]: any }>;
    metadata?: Metadata;
    serialize: serialize;
    deserialize: deserialize;
    callOptions?: CallOptions;
}

export class CallImplementation implements Call {

    constructor(private grpcCall, public metadata: Metadata) {
    }

    public responseObservable = new Subject<MessageAccessor<{}>>();

    public cancel() {
        this.grpcCall.cancel();
    }

    public getPeer() {
        return this.grpcCall.getPeer();
    }
}

export enum GrpcRequestType {
    Unary = 'unary',
    ClientStreaming = 'client_stream',
    ServerStreaming = 'server_stream',
    BidirectionalStreaming = 'bidi'
}
