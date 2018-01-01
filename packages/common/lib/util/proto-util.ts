import * as ProtoBuf from 'protobufjs';
import { GrpcRequestType } from '../interfaces';
import { serialize, deserialize } from 'grpc';

export function forEachMethodInProto(proto: ProtoBuf.AnyNestedObject, action: (method: ProtoBuf.Method) => void) {
    if (proto instanceof ProtoBuf.Service) {
        proto.methodsArray.forEach(action);
    } else if ((proto as any).nestedArray) {
        (proto as any).nestedArray.forEach((n) => forEachMethodInProto(n, action));
    }
}

export function grpcMethodTypeOfProto(proto: ProtoBuf.Method) {
    if (proto.requestStream) {
        return proto.responseStream ? GrpcRequestType.BidirectionalStreaming :
            GrpcRequestType.ClientStreaming;
    } else {
        return proto.responseStream ? GrpcRequestType.ServerStreaming :
            GrpcRequestType.Unary;
    }
}

export function grpcPathOfMethod(proto: ProtoBuf.Method) {
    const serviceName = proto.parent.fullName.substr(1); // contains leading dot
    
    // format for request path see https://grpc.io/docs/guides/wire.html
    return `/${serviceName}/${proto.name}`;
}

export function getMethodInfo(method: ProtoBuf.Method): MethodInfo {
    method.resolve();
    return {
        type: grpcMethodTypeOfProto(method),
        name: { namespace: method.parent && method.parent.fullName.substr(1), name: method.name },
        requestSerialize: serializer(method.resolvedRequestType),
        requestDeserialize: deserializer(method.resolvedRequestType),
        responseSerialize: serializer(method.resolvedResponseType),
        responseDeserialize: deserializer(method.resolvedResponseType),
        requestType: method.resolvedRequestType,
        responseType: method.resolvedResponseType
   };
}

export interface MethodInfo {
    name: { namespace: string, name: string };
    type: GrpcRequestType;
    requestSerialize: serialize;
    requestDeserialize: deserialize;
    responseSerialize: serialize;
    responseDeserialize: deserialize;
    requestType: ProtoBuf.Type;
    responseType: ProtoBuf.Type;
}

export function serializer(type: ProtoBuf.Type) {
    return (value: ProtoBuf.Message<{}> | { [k: string]: any }) => value instanceof ProtoBuf.Message ?
        type.encode(value).finish() as Buffer :
        type.encode(type.create(value)).finish() as Buffer;
}

export function deserializer(type: ProtoBuf.Type) {
    return (value: Buffer) => type.decode(value);
}
