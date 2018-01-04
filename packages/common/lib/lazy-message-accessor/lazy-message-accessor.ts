import * as ProtoBuf from 'protobufjs';
import { MessageAccessor } from '../interfaces';
import { Message } from 'protobufjs';

export class LazyMessageAccesor<T extends object> implements MessageAccessor<T> {

    private buffer: Buffer;
    private message: Message<T> | { [k: string]: any };

    constructor(protected type: ProtoBuf.Type, initialValue: Buffer | Message<T>  | { [k: string]: any }) {
        if (initialValue instanceof Buffer) {
            this.buffer = initialValue;
        } else {
            this.message = initialValue;
        }
    }

    public getBinary(): Buffer {
        if (!this.buffer) {
            this.serialize();
        }
        return this.buffer;
    }

    public setBinary(buffer: Buffer) {
        this.buffer = buffer;
        this.message = null;
    }

    public getMessage(): Message<T> | { [k: string]: any } {
        if (!this.message) {
            this.deserialize();
        }
        return this.message;
    }

    public setMessage(m: T | { [k: string]: any }) {
        this.message = m;
        this.buffer = null;
    }

    protected serialize() {
        this.buffer = this.type.encode(this.message).finish() as Buffer;
    }

    protected deserialize() {
        this.message = this.type.decode(this.buffer);
    }
}
