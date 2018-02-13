import { Observable, Subject } from '@reactivex/rxjs';
import * as grpc from 'grpc';
import { EventEmitter } from 'events';

import { Call, MessageAccessor, GrpcMethodType } from '@any2api/gateframe-common';

export interface RequestParameters {
    method: string;
    type: GrpcMethodType;
    requestObservable: Observable<{ [props: string]: any }>;
    metadata?: grpc.Metadata;
    serialize: grpc.serialize;
    deserialize: grpc.deserialize;
    callOptions?: grpc.CallOptions;
}

export class CallImplementation implements Call {

    constructor(private grpcCall, public header: grpc.Metadata) {}

    public responseObservable = new Subject<MessageAccessor<{}>>();

    public status = new Subject<grpc.StatusObject>();

    public cancel() {
        this.grpcCall.cancel();
    }

    public getPeer() {
        return this.grpcCall.getPeer();
    }
}
