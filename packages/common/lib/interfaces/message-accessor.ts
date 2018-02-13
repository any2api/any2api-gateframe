import * as ProtoBuf from 'protobufjs';

/**
 * Generic interface to access request and response objects.
 * Allows lazy (de-)serialization of messages.
 */
export interface MessageAccessor<T extends object> {
    getBinary(): Buffer;
    setBinary(buffer: Buffer);

    getMessage(): ProtoBuf.Message<T> | { [k: string]: any };
    setMessage(m: T | { [k: string]: any });
}
