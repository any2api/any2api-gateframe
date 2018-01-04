import * as ProtoBuf from 'protobufjs';

export interface MessageAccessor<T extends object> {
    getBinary(): Buffer;
    setBinary(buffer: Buffer);

    getMessage(): ProtoBuf.Message<T> | { [k: string]: any };
    setMessage(m: T | { [k: string]: any });
}
