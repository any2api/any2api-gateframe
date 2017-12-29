import * as ProtoBuf from 'protobufjs';

export function serializer(type: ProtoBuf.Type) {
    return (value: ProtoBuf.Message<{}> | { [k: string]: any }) => value instanceof ProtoBuf.Message ?
        type.encode(value).finish() as Buffer :
        type.encode(type.create(value)).finish() as Buffer;
}

export function deserializer(type: ProtoBuf.Type) {
    return (value: Buffer) => type.decode(value);
}
