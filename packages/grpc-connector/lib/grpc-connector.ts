import { Observable, Observer } from '@reactivex/rxjs';
import * as grpc from 'grpc';

import { Connector, RequestParameters, Call, GrpcMethodType, LazyMessageAccesor,
    MessageAccessor } from '@any2api/gateframe-common';
import { GrpcConnectorConfig } from './config';
import { CallImplementation } from './call';

export class GrpcConnector implements Connector {

    private client: grpc.Client;

    constructor(private config: GrpcConnectorConfig) {
        if (config.insecure) {
            this.client = new grpc.Client(config.address, grpc.credentials.createInsecure());
        } else {
            this.client = new grpc.Client(config.address, grpc.credentials.createSsl());
        }
    }

    public makeRequest(parameters: RequestParameters): Observable<Call> {
        switch (parameters.type) {
            case GrpcMethodType.Unary: return this.unary(parameters);
            case GrpcMethodType.ClientStreaming: return this.clientStreaming(parameters);
            case GrpcMethodType.ServerStreaming: return this.serverStreaming(parameters);
            case GrpcMethodType.BidirectionalStreaming: return this.bidirectionalStreaming(parameters);
            default: throw new Error('Type of request not known');
        }
    }

    private unary = (params: RequestParameters): Observable<Call> => {
        return Observable.create((observer: Observer<Call>) => {
            let downstreamCall: CallImplementation;

            params.requestObservable
            .take(1)
            .subscribe(
            (request) => {
                // workaround for argue js type checking
                if (params.metadata) {
                    Object.setPrototypeOf(params.metadata, Object.getPrototypeOf(new grpc.Metadata()));
                }

                const upstreamCall = this.client.makeUnaryRequest(
                    `/${params.method.namespace}/${params.method.name}`,
                    (accessor) => accessor.getBinary(),
                    (buffer) => new LazyMessageAccesor(params.responseType, buffer),
                    request, params.metadata, params.callOptions,
                    (e, response) => {
                        if (!downstreamCall) {
                            return observer.error(new Error('Metadata not received before response'));
                        }
                        if (e === null) { 
                            downstreamCall.responseObservable.next(response);
                        }

                        downstreamCall.responseObservable.complete();
                    }
                );

                (upstreamCall as any).on('metadata', (m) => {
                    downstreamCall = new CallImplementation(upstreamCall, m);
                
                    observer.next(downstreamCall);
                    observer.complete();
                });

                (upstreamCall as any).on('status', (status) => {
                    downstreamCall.status.next(status);
                    downstreamCall.status.complete();
                });
            },
            (e) => observer.error(e));
        });
    }

    private clientStreaming = (params: RequestParameters): Observable<Call> => {

        return Observable.create((observer: Observer<Call>) => {
            // workaround for argue js type checking
            if (params.metadata) {
                Object.setPrototypeOf(params.metadata, Object.getPrototypeOf(new grpc.Metadata()));
            }
            
            let downstreamCall: CallImplementation;
    
            const upstreamCall = this.client.makeClientStreamRequest(
                `/${params.method.namespace}/${params.method.name}`,
                (accessor) => accessor.getBinary(),
                (buffer) => new LazyMessageAccesor(params.responseType, buffer),
                params.metadata,
                params.callOptions,
                (e, response) => {
                    if (e) { return observer.error(e); }
                    if (!downstreamCall) {
                        return observer.error(new Error('Metadata not received before response'));
                    }

                    downstreamCall.responseObservable.next(response);
                    downstreamCall.responseObservable.complete();
                });

            upstreamCall.on('metadata', (m) => {
                downstreamCall = new CallImplementation(upstreamCall, m);
            
                observer.next(downstreamCall);
                observer.complete();
            });

            upstreamCall.on('status', (status) => {
                downstreamCall.status.next(status);
                downstreamCall.status.complete();
            });

            params.requestObservable
                .subscribe(
                (request) => upstreamCall.write(request),
                null,
                () => { upstreamCall.end(); }
            );
        });
    }

    private serverStreaming = (params: RequestParameters): Observable<Call> => {
        return Observable.create((observer: Observer<Call>) => {
            let downstreamCall: CallImplementation;

            params.requestObservable
            .take(1)
            .subscribe(
            (request) => {
                // workaround for argue js type checking
                if (params.metadata) {
                    Object.setPrototypeOf(params.metadata, Object.getPrototypeOf(new grpc.Metadata()));
                }

                const upstreamCall = this.client.makeServerStreamRequest(
                    `/${params.method.namespace}/${params.method.name}`,
                    (accessor) => accessor.getBinary(),
                    (buffer) => new LazyMessageAccesor(params.responseType, buffer),
                    request, params.metadata, params.callOptions
                );

                upstreamCall.on('metadata', (m) => {
                    downstreamCall = new CallImplementation(upstreamCall, m);
                
                    observer.next(downstreamCall);
                    observer.complete();
                });

                upstreamCall.on('error', (e) => {
                    // output error on downstream call, fallback to call observable
                    (downstreamCall && downstreamCall.responseObservable || observer)
                        .error(e);
                });

                upstreamCall.on('data', (res: MessageAccessor<{}>) => {
                    if (!downstreamCall) { return observer.error(new Error('Metadata not received before response')); }
                    downstreamCall.responseObservable.next(res);
                });

                upstreamCall.on('status', (status) => {
                    downstreamCall.status.next(status);
                    downstreamCall.status.complete();
                });

                upstreamCall.on('end', () => {
                    if (!downstreamCall) {
                        return observer.error(new Error('Metadata not received before call completed'));
                    }
                    downstreamCall.responseObservable.complete();
                });
            },
            (e) => observer.error(e));
        });
    }

    private bidirectionalStreaming = (params: RequestParameters): Observable<Call> => {
        return Observable.create((observer: Observer<Call>) => {
            // workaround for argue js type checking
            if (params.metadata) {
                Object.setPrototypeOf(params.metadata, Object.getPrototypeOf(new grpc.Metadata()));
            }

            let downstreamCall: CallImplementation;

            const upstreamCall = this.client.makeBidiStreamRequest(
                `/${params.method.namespace}/${params.method.name}`,
                (accessor) => accessor.getBinary(),
                (buffer) => new LazyMessageAccesor(params.responseType, buffer),
                params.metadata, params.callOptions);

            upstreamCall.on('metadata', (m) => {
                downstreamCall = new CallImplementation(upstreamCall, m);
            
                observer.next(downstreamCall);
                observer.complete();
            });

            upstreamCall.on('error', (e) => {
                // output error on downstream call, fallback to call observable
                (downstreamCall && downstreamCall.responseObservable || observer)
                    .error(e);
            });

            upstreamCall.on('data', (res) => {
                if (!downstreamCall) { return observer.error(new Error('Metadata not received before response')); }
                downstreamCall.responseObservable.next(res as any);
            });

            upstreamCall.on('status', (status) => {
                downstreamCall.status.next(status);
                downstreamCall.status.complete();
            });

            upstreamCall.on('end', () => {
                if (!downstreamCall) {
                    return observer.error(new Error('Metadata not received before call completed'));
                }
                downstreamCall.responseObservable.complete();
            });

            params.requestObservable.subscribe(
                (request) => upstreamCall.write(request),
                null,
                () => upstreamCall.end()
            );
        });
    }
}
