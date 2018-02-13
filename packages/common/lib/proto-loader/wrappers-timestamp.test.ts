import * as ProtoBuf from 'protobufjs';

import './wrappers';
import { loadProtoFromString } from './proto-loader';

let Foo: ProtoBuf.Type;

beforeAll(async () => {
    const root = (await loadProtoFromString(`
        syntax = "proto3";

        import "google/protobuf/timestamp.proto";

        message Foo { google.protobuf.Timestamp foo = 1; }
    `)).resolveAll();

    Foo = root.lookupType('.Foo');
});

test('date to timestamp', () => {
    const obj = {
        foo: new Date('1970-01-01T00:00:00Z')
    };

    let foo: any = Foo.fromObject(obj);
    expect(foo.foo).toEqual({ seconds: 0, nanos: 0 });

    obj.foo = new Date('1969-12-31T23:59:59.999Z');

    foo = Foo.fromObject(obj);
    expect(foo.foo).toEqual({ seconds: -1, nanos: 999000000 });
});

test('timestamp to date', () => {
    const foo: any = Foo.fromObject({ foo: { seconds: 0, nanos: 0 } });
    const obj = Foo.toObject(foo);

    expect(obj.foo.toISOString()).toEqual('1970-01-01T00:00:00.000Z');
});
