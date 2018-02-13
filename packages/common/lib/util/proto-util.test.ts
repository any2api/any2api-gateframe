import * as ProtoBuf from 'protobufjs';
import { loadProtoFromString, grpcMethodTypeOfProto, forEachMethodInProto,
    GrpcMethodType, grpcPathOfMethod, getProtoMethodInfo } from '../index';

let proto: ProtoBuf.Root;

beforeAll(async () => {
    proto = await loadProtoFromString(`
    syntax = "proto3";
    package test;
    message M {}
    service S {
        rpc Foo(M) returns (M);
        rpc Bar(M) returns (M);
    }
    service T {
        rpc FooBar(M) returns (M);
    }
`);
});

test('forEachMethodInProto', async () => {
    const mock = jest.fn();

    forEachMethodInProto(proto, mock);

    expect(mock.mock.calls.map((args) => args[0].name))
        .toEqual(['Foo', 'Bar', 'FooBar']);
});

test('grpcMethodTypeOfProto', () => {
    // default is unary
    expect(grpcMethodTypeOfProto({} as any)).toBe(GrpcMethodType.Unary);
    expect(grpcMethodTypeOfProto({ requestStream: false, responseStream: false } )).toBe(GrpcMethodType.Unary);

    expect(grpcMethodTypeOfProto({ requestStream: true, responseStream: false } )).toBe(GrpcMethodType.ClientStreaming);
    expect(grpcMethodTypeOfProto({ requestStream: false, responseStream: true } )).toBe(GrpcMethodType.ServerStreaming);
    expect(grpcMethodTypeOfProto({ requestStream: true, responseStream: true } ))
        .toBe(GrpcMethodType.BidirectionalStreaming);
});

test('grpcPathOfMethod', () => {
    const method: ProtoBuf.Method = proto.lookup('.test.S.Foo') as any;

    expect(grpcPathOfMethod(method)).toBe('/test.S/Foo');
});

test('getProtoMethodInfo', () => {
    const method: ProtoBuf.Method = proto.lookup('.test.S.Foo') as any;
    const message = proto.lookup('test.M');

    expect(getProtoMethodInfo(method))
        .toEqual({
            type: GrpcMethodType.Unary,
            name: { namespace: 'test.S', name: 'Foo' },
            requestType: message,
            responseType: message
        });
});
