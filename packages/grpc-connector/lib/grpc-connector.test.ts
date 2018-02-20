import * as ProtoBuf from 'protobufjs';
import * as grpc from 'grpc';
import { Observable } from '@reactivex/rxjs';
import { getPortPromise } from 'portfinder';

import { loadProtoFromString, GrpcMethodType, LazyMessageAccesor,
    FromObjectStreamObservable } from '@any2api/gateframe-common';
import { connectorPlugin } from './grpc-connector-plugin';
import { GrpcConnectorConfig } from './config';
import { GrpcConnector } from './grpc-connector';
import { expand } from '@reactivex/rxjs/dist/package/operators/expand';
import { fail } from 'assert';
import { RequestParameters } from '../dist/call';

let requestMetadata: grpc.Metadata;
let responseHeaderMetadata: grpc.Metadata;
let responseTrailerMetadata: grpc.Metadata;
let proto: ProtoBuf.Root;
let M: ProtoBuf.Type;
let port: number;
let instance: GrpcConnector;

let unaryMock: jest.Mock;
let clientStreamingMock: jest.Mock;
let serverStreamingMock: jest.Mock;
let bidiMock: jest.Mock;

let server: grpc.Server;

function multiDone(done, amount) {
    let counter = 0;
    return () => {
        if (++counter === amount) {
            done();
        }
    };
}

const protoDefinition = `
syntax = "proto3";
package test;
message M { string m = 1; }
service S {
    rpc Unary(M) returns (M);
    rpc ClientStream(stream M) returns (M);
    rpc ServerStream(M) returns (stream M);
    rpc BidiStream(stream M) returns (stream M);
}
`;

beforeAll(async () => {
    proto = await loadProtoFromString(protoDefinition);
    M = proto.lookupType('.M');

    unaryMock = jest.fn();
    clientStreamingMock = jest.fn();
    serverStreamingMock = jest.fn();
    bidiMock = jest.fn();

    await initGrpc();
});

beforeEach(() => {
    requestMetadata = new grpc.Metadata();
    requestMetadata.add('foo', 'boobar');

    responseHeaderMetadata = new grpc.Metadata();
    responseHeaderMetadata.add('bar', 'barfoo');

    responseTrailerMetadata = new grpc.Metadata();
    responseTrailerMetadata.add('foobar', 'bar');
});

afterAll(async () => {
    server.forceShutdown();
});

const initGrpc = async () => {
    port = await getPortPromise();

    const config: GrpcConnectorConfig = {
        address: `localhost:${port}`,
        protoDefinition,
        insecure: true
    };
    
    const result = await connectorPlugin.init(config);

    instance = result.instance as GrpcConnector;
    expect(result.serviceDefinition.toJSON()).toEqual(proto.toJSON());

    const service = (grpc.loadObject(proto).test as any).S;
    server = new grpc.Server();
    server.addService(service.service, {
            unary: unaryMock,
            clientStream: clientStreamingMock,
            serverStream: serverStreamingMock,
            bidiStream: bidiMock
         });
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
};

test('load config type', () => {
    expect(connectorPlugin.configurationTypes).toBeTruthy();
    expect(connectorPlugin.configurationTypes.lookupType('.any2api.grpc.connector.Config')).toBeTruthy();
});

test('throw error on not set address', () => {
    expect.assertions(2);
    expect(connectorPlugin.init(null)).rejects.toBeDefined();
    expect(connectorPlugin.init({})).rejects.toBeDefined();
});

test('unary request test', (d) => {
    const done = multiDone(d, 2);
    expect.assertions(6);

    unaryMock.mockImplementation((call: grpc.ServerUnaryCall, callback) => {
        call.sendMetadata(responseHeaderMetadata);
        expect(call.request).toEqual({ m: 'foo' });
        expect(call.metadata.getMap()).toMatchObject(requestMetadata.getMap());

        callback(null, { m: 'bar' }, responseTrailerMetadata);
    });

    instance.makeRequest({
        type: GrpcMethodType.Unary,
        method: {
            name: 'Unary',
            namespace: 'test.S'
        },
        responseType: M,
        metadata: requestMetadata,
        requestObservable: Observable.of(new LazyMessageAccesor(M, { m: 'foo' }))
    }).subscribe(
    (call) => {
        expect(call.header.getMap()).toMatchObject(responseHeaderMetadata.getMap());
        
        call.responseObservable.subscribe(
            (response) => {
                expect(response.getMessage()).toMatchObject({ m: 'bar' });
                done();
            },
            fail);

        call.status.subscribe(
            (status) => {
                expect(status.code).toEqual(grpc.status.OK);
                expect(status.metadata.getMap()).toEqual(responseTrailerMetadata.getMap());
                done();
            },
            fail);
    },
    fail);

});

test('client streaming request', (d) => {
    const done = multiDone(d, 2);
    expect.assertions(6);

    clientStreamingMock.mockImplementation((call: grpc.ServerReadableStream, callback) => {
        call.sendMetadata(responseHeaderMetadata);
        expect(call.metadata.getMap()).toMatchObject(requestMetadata.getMap());
        new FromObjectStreamObservable(call)
            .toArray()
            .subscribe(
                (r) => {
                    callback(null, { m: 'bar' }, responseTrailerMetadata);
                    expect(r).toEqual([{ m: 'foo'}, { m: 'foobar' }]);
                },
                fail);
    });

    instance.makeRequest({
        type: GrpcMethodType.ClientStreaming,
        method: {
            name: 'ClientStream',
            namespace: 'test.S'
        },
        responseType: M,
        metadata: requestMetadata,
        requestObservable: Observable.of({ m: 'foo' }, { m: 'foobar' }).map((e) => new LazyMessageAccesor(M, e))
    }).subscribe(
    (call) => {
        expect(call.header.getMap()).toMatchObject(responseHeaderMetadata.getMap());
        
        call.responseObservable.subscribe(
            (response) => {
                expect(response.getMessage()).toEqual({ m: 'bar' });
                done();
            },
            fail);

        call.status.subscribe(
            (status) => {
                expect(status.code).toEqual(grpc.status.OK);
                expect(status.metadata.getMap()).toEqual(responseTrailerMetadata.getMap());
                done();
            },
            fail);
    },
    fail);

});

test('server streaming request', (d) => {
    const done = multiDone(d, 2);
    expect.assertions(6);

    serverStreamingMock.mockImplementation((call: grpc.ServerWriteableStream) => {
        call.sendMetadata(responseHeaderMetadata);
        expect(call.request).toEqual({ m: 'foo' });
        expect(call.metadata.getMap()).toMatchObject(requestMetadata.getMap());

        call.write({ m: 'bar' });
        call.write({ m: 'barfoo' });
        call.end(responseTrailerMetadata);
    });

    instance.makeRequest({
        type: GrpcMethodType.ServerStreaming,
        method: {
            name: 'ServerStream',
            namespace: 'test.S'
        },
        responseType: M,
        metadata: requestMetadata,
        requestObservable: Observable.of(new LazyMessageAccesor(M, { m: 'foo' }))
    }).subscribe(
    (call) => {
        expect(call.header.getMap()).toMatchObject(responseHeaderMetadata.getMap());
        
        call.responseObservable.map((r) => r.getMessage()).toArray().subscribe(
            (responses) => {
                expect(responses).toEqual([{ m: 'bar' }, { m: 'barfoo' }]);
                done();
            },
            fail);

        call.status.subscribe(
            (status) => {
                expect(status.code).toEqual(grpc.status.OK);
                expect(status.metadata.getMap()).toEqual(responseTrailerMetadata.getMap());
                done();
            },
            fail);
    },
    fail);

});

test('bidi streaming request', (d) => {
    const done = multiDone(d, 3);
    expect.assertions(6);

    bidiMock.mockImplementation((call: grpc.ServerDuplexStream) => {
        call.sendMetadata(responseHeaderMetadata);
        expect((call as any).metadata.getMap()).toMatchObject(requestMetadata.getMap());

        new FromObjectStreamObservable(call)
        .toArray()
        .subscribe(
            (r) => expect(r).toEqual([{ m: 'foo'}, { m: 'foobar' }]),
            fail,
            done);

        call.write({ m: 'bar' });
        call.write({ m: 'barfoo' });
        call.end(responseTrailerMetadata);
    });

    instance.makeRequest({
        type: GrpcMethodType.BidirectionalStreaming,
        method: {
            name: 'BidiStream',
            namespace: 'test.S'
        },
        responseType: M,
        metadata: requestMetadata,
        requestObservable: Observable.of({ m: 'foo' }, { m: 'foobar' }).map((e) => new LazyMessageAccesor(M, e))
    }).subscribe(
    (call) => {
        expect(call.header.getMap()).toMatchObject(responseHeaderMetadata.getMap());
        
        call.responseObservable.map((r) => r.getMessage()).toArray().subscribe(
            (responses) => {
                expect(responses).toEqual([{ m: 'bar' }, { m: 'barfoo' }]);
                done();
            },
            fail);

        call.status.subscribe(
            (status) => {
                expect(status.code).toEqual(grpc.status.OK);
                expect(status.metadata.getMap()).toEqual(responseTrailerMetadata.getMap());
                done();
            },
            fail);
    },
    fail);

});

test('prepareParameters updates prototype of metadata', () => {
    const connector: { prepareParameters(params: RequestParameters) } = instance as any;

    const params = { metadata: {} };
    connector.prepareParameters(params as any);
    expect(Object.getPrototypeOf(params.metadata)).toBe(Object.getPrototypeOf(new grpc.Metadata()));
});

test('prepareParameters creates metadata if falsy', () => {
    const connector: { prepareParameters(params: RequestParameters) } = instance as any;

    const params = { metadata: undefined };
    connector.prepareParameters(params as any);
    expect(Object.getPrototypeOf(params.metadata)).toBe(Object.getPrototypeOf(new grpc.Metadata()));
});

test('prepareParameters creates callOptions if falsy', () => {
    const connector: { prepareParameters(params: RequestParameters) } = instance as any;

    const params = { callOptions: undefined };
    connector.prepareParameters(params as any);
    expect(params.callOptions).toBeDefined;
});

test('prepareParameters leaves truthy callOptions unchanged', () => {
    const connector: { prepareParameters(params: RequestParameters) } = instance as any;

    const params = { callOptions: { foo: "bar" } };
    connector.prepareParameters(params as any);
    expect(params.callOptions).toEqual({ foo: "bar" });
});
