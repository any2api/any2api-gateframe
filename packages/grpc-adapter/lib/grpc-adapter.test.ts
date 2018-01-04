import * as ProtoBuf from 'protobufjs';
import * as grpc from 'grpc';
import { Observable } from '@reactivex/rxjs';
import { getPortPromise } from 'portfinder';

import { loadProtoFromString, Call, LazyMessageAccesor, GrpcMethodType,
    RequestParameters } from '@any2api/gateway-common';

import { grpcAdapterPlugin } from './grpc-adapter-plugin';
import { GrpcAdapter } from './grpc-adapter';
import { Subject } from '../../common/node_modules/@reactivex/rxjs/dist/package/Subject';
import { request } from 'https';
import { ReplaySubject } from '../../common/node_modules/@reactivex/rxjs/dist/package/ReplaySubject';

function multiDone(done, amount) {
    let counter = 0;
    return () => {
        if (++counter === amount) {
            done();
        }
    };
}

let requestMetadata: grpc.Metadata;
let responseMetadata: grpc.Metadata;
let proto: ProtoBuf.Root;
let M: ProtoBuf.Type;
let port: number;
let upstreamMock: jest.Mock;
let instance: GrpcAdapter;

let client;

beforeAll(async () => {
    proto = await loadProtoFromString(`
        syntax = "proto3";
        package test;
        message M { string m = 1; }
        service S {
            rpc Unary(M) returns (M);
            rpc ClientStream(stream M) returns (M);
            rpc ServerStream(M) returns (stream M);
            rpc BidiStream(stream M) returns (stream M);
        }
    `);
    M = proto.lookupType('.M');

    upstreamMock = jest.fn();

    await initGrpc();
});

const initGrpc = async () => {
    port = await getPortPromise();
    
    const upstream = { makeRequest: upstreamMock }; 
    const result = await grpcAdapterPlugin.init(proto, upstream, { 
        port: `0.0.0.0:${port}`,
        insecure: true
    });

    instance = result.instance as GrpcAdapter;

    const service = (grpc.loadObject(proto).test as any).S as (typeof grpc.Client);
    client = new service(`localhost:${port}`, grpc.credentials.createInsecure());
};

beforeEach((done) => {
    requestMetadata = new grpc.Metadata();
    requestMetadata.add('foo', 'boobar');

    responseMetadata = new grpc.Metadata();
    responseMetadata.add('bar', 'barfoo');

    if (upstreamMock) {
        upstreamMock.mockClear();
    }
    done();
});

afterAll(async () => {
    await instance.gracefullShutdown();
});

test('load config type', () => {
    expect(grpcAdapterPlugin.configurationTypes).toBeTruthy();
    expect(grpcAdapterPlugin.configurationTypes.lookupType('.any2api.grpc.adapter.Config')).toBeTruthy();
});

test('throw error on not set port', () => {
    expect.assertions(2);
    expect(grpcAdapterPlugin.init(null, null, null)).rejects.toBeDefined();
    expect(grpcAdapterPlugin.init(null, null, {})).rejects.toBeDefined();
});

function callFrom(requests: Observable<any>, ...elements: Array<{ m: string }>): Call {
    const responses = new ReplaySubject<LazyMessageAccesor<{}>>();
    requests.subscribe(null, null, () => {
        elements.forEach((e) => responses.next(new LazyMessageAccesor(M, e)));
        responses.complete();
    });
    return {
        cancel: () => ({}),
        getPeer: () => '',
        metadata: responseMetadata,
        responseObservable: responses
    };
}

test('unary call test', (done) => {
    expect.assertions(6);

    upstreamMock.mockImplementation((upstreamParameters: RequestParameters): Observable<Call> => {
        upstreamParameters.requestObservable = upstreamParameters.requestObservable.shareReplay();

        expect(upstreamParameters).toMatchObject({
            method: {
                namespace: 'test.S',
                name: 'Unary'
            },
            type: GrpcMethodType.Unary
        });

        expect(upstreamParameters.metadata.getMap()).toMatchObject(requestMetadata.getMap());
        upstreamParameters.requestObservable
            .subscribe(
            (r) => {
                expect(r.getMessage()).toEqual({ m: 'foo' });
            });
        
        const call: Call = callFrom(upstreamParameters.requestObservable, { m: 'bar' });
        return Observable.of(call);
    });

    const unaryCall = client.unary({ m: 'foo' }, requestMetadata, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual({ m: 'bar' });
        
        done();
    });

    unaryCall.on('metadata', (metadata) => {
        expect(metadata.getMap()).toMatchObject(responseMetadata.getMap());
    });
});

test('client stream call', (done) => {
    expect.assertions(6);

    upstreamMock.mockImplementation((upstreamParameters: RequestParameters): Observable<Call> => {
        upstreamParameters.requestObservable = upstreamParameters.requestObservable.share();

        expect(upstreamParameters).toMatchObject({
            method: {
                namespace: 'test.S',
                name: 'ClientStream'
            },
            type: GrpcMethodType.ClientStreaming
        });

        expect(upstreamParameters.metadata.getMap()).toMatchObject(requestMetadata.getMap());
        upstreamParameters.requestObservable
            .toArray()
            .subscribe(
            (r) => {
                expect(r.map((m) => m.getMessage())).toEqual( [{ m: 'foo' }, { m: 'foobar' }]);
            });

        const call: Call = callFrom(upstreamParameters.requestObservable, { m: 'bar' });
        return Observable.of(call);
    });

    const clientStreamCall = client.clientStream(requestMetadata, (err, response) => {
        expect(err).toBeNull();
        expect(response).toEqual({ m: 'bar' });

        done();
    });

    clientStreamCall.write({ m: 'foo' });
    clientStreamCall.write({ m: 'foobar' });

    clientStreamCall.on('metadata', (metadata) => {
        expect(metadata.getMap()).toMatchObject(responseMetadata.getMap());
    });

    clientStreamCall.on('error', (e) => fail(e));

    clientStreamCall.end();
});

test('server streaming call', (done) => {
    expect.assertions(5);

    upstreamMock.mockImplementation((upstreamParameters: RequestParameters): Observable<Call> => {
        upstreamParameters.requestObservable = upstreamParameters.requestObservable.shareReplay();

        expect(upstreamParameters).toMatchObject({
            method: {
                namespace: 'test.S',
                name: 'ServerStream'
            },
            type: GrpcMethodType.ServerStreaming
        });

        expect(upstreamParameters.metadata.getMap()).toMatchObject(requestMetadata.getMap());
        upstreamParameters.requestObservable
            .subscribe(
            (r) => {
                expect(r.getMessage()).toEqual({ m: 'foo' });
            });
        
        const call: Call = callFrom(upstreamParameters.requestObservable, { m: 'bar' }, { m: 'barbar' });
        return Observable.of(call);
    });

    const serverStreamingCall = client.serverStream({ m: 'foo' }, requestMetadata);

    serverStreamingCall.on('metadata', (metadata) => {
        expect(metadata.getMap()).toMatchObject(responseMetadata.getMap());
    });

    serverStreamingCall.on('error', (e) => fail(e));

    const received = [];
    serverStreamingCall.on('data', (r) => received.push(r));
    serverStreamingCall.on('end', () => {
        expect(received).toEqual([{ m: 'bar' }, { m: 'barbar'}]);
        done();
    }); 
});

test('bidi stream call', (done) => {
    expect.assertions(5);

    upstreamMock.mockImplementation((upstreamParameters: RequestParameters): Observable<Call> => {
        upstreamParameters.requestObservable = upstreamParameters.requestObservable.share();

        expect(upstreamParameters).toMatchObject({
            method: {
                namespace: 'test.S',
                name: 'BidiStream'
            },
            type: GrpcMethodType.BidirectionalStreaming
        });

        expect(upstreamParameters.metadata.getMap()).toMatchObject(requestMetadata.getMap());
        upstreamParameters.requestObservable
            .toArray()
            .subscribe(
            (r) => {
                expect(r.map((m) => m.getMessage())).toEqual( [{ m: 'foo' }, { m: 'foobar' }]);
            });

        const call: Call = callFrom(upstreamParameters.requestObservable, { m: 'bar' }, { m: 'barbar'});
        return Observable.of(call);
    });

    const bidiCall = client.bidiStream(requestMetadata);

    bidiCall.on('metadata', (metadata) => {
        expect(metadata.getMap()).toMatchObject(responseMetadata.getMap());
    });

    bidiCall.on('error', (e) => fail(e));

    const received = [];
    bidiCall.on('data', (r) => received.push(r));
    bidiCall.on('end', () => {
        expect(received).toEqual([{ m: 'bar' }, { m: 'barbar'}]);
        done();
    });

    bidiCall.write({ m: 'foo' });
    bidiCall.write({ m: 'foobar' });

    bidiCall.end();
});
