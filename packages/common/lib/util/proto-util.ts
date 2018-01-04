import * as ProtoBuf from 'protobufjs';
import { GrpcMethodType } from '../interfaces';
import { serialize, deserialize } from 'grpc';

export function forEachMethodInProto(proto: ProtoBuf.AnyNestedObject, action: (method: ProtoBuf.Method) => void) {
    if (proto instanceof ProtoBuf.Service) {
        proto.methodsArray.forEach(action);
    } else if ((proto as any).nestedArray) {
        (proto as any).nestedArray.forEach((n) => forEachMethodInProto(n, action));
    }
}

export function grpcMethodTypeOfProto(proto: { requestStream?: boolean, responseStream?: boolean }) {
    if (proto.requestStream) {
        return proto.responseStream ? GrpcMethodType.BidirectionalStreaming :
            GrpcMethodType.ClientStreaming;
    } else {
        return proto.responseStream ? GrpcMethodType.ServerStreaming :
            GrpcMethodType.Unary;
    }
}

export function grpcPathOfMethod(proto: ProtoBuf.Method) {
    const serviceName = proto.parent.fullName.substr(1); // contains leading dot
    
    // format for request path see https://grpc.io/docs/guides/wire.html
    return `/${serviceName}/${proto.name}`;
}

export function getProtoMethodInfo(method: ProtoBuf.Method): MethodInfo {
    method.resolve();
    return {
        type: grpcMethodTypeOfProto(method),
        name: { namespace: method.parent && method.parent.fullName.substr(1), name: method.name },
        requestType: method.resolvedRequestType,
        responseType: method.resolvedResponseType
   };
}

export interface MethodInfo {
    name: { namespace: string, name: string };
    type: GrpcMethodType;
    requestType: ProtoBuf.Type;
    responseType: ProtoBuf.Type;
}
