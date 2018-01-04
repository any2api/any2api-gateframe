import * as ProtoBuf from 'protobufjs';
import { Message } from 'protobufjs';

import { loadProtoFromString } from '../index';

let root: ProtoBuf.Root;
let Any: ProtoBuf.Type;
let Foo: ProtoBuf.Type;
let Bar: ProtoBuf.Type;

beforeAll(async () => {
    root = await loadProtoFromString(`
        syntax = "proto3";

        import 'google/protobuf/any.proto';

        message Foo { google.protobuf.Any foo = 1; }
        message Bar { string bar = 1; }
    `);

    root.resolveAll();

    Any = root.lookupType('.google.protobuf.Any');
    Foo = root.lookupType('.Foo');
    Bar = root.lookupType('.Bar');
});

// test from https://github.com/dcodeIO/protobuf.js/blob/master/tests/comp_google_protobuf_any.js
test('gooogle.protobuf.Any', () => {
    let foo: any = Foo.fromObject({
        foo: {
            typeUrl: 'Bar',
            // tslint:disable-next-line:no-bitwise
            value: ProtoBuf.util.newBuffer([1 << 3 | 2, 1, 97]) // value = "a"
        }
    });

    expect(foo.foo instanceof Any.ctor).toBeTruthy(); // should keep explicit Any in fromObject
    expect(foo.foo).toEqual({ typeUrl: 'Bar', value: ProtoBuf.util.newBuffer([10, 1, 97]) });
    // should keep explicit Any in fromObject properly');

    let obj = Foo.toObject(foo);
    expect(obj.foo).toEqual({ typeUrl: 'Bar', value: ProtoBuf.util.newBuffer([10, 1, 97]) });
    // should keep explicit Any in toObject properly

    obj = Foo.toObject(foo, { json: true });
    expect(obj.foo).toEqual({ '@type': '.Bar', 'bar': 'a' }); // should decode explicitly Any in toObject if requested

    foo = Foo.fromObject({
        foo: {
            '@type': '.Bar',
            'bar': 'a'
        }
    });
    expect(foo.foo instanceof Any.ctor).toBeTruthy(); // should convert to Any in fromObject
    expect(foo.foo).toEqual({ typeUrl: '/Bar', value: ProtoBuf.util.newBuffer([10, 1, 97]) });
    // should have correct Any object when converted with fromObject

    const baz = Foo.fromObject({
        foo: {
            typeUrl: 'type.someurl.com/Bar',
            // tslint:disable-next-line:no-bitwise
            value: [1 << 3 | 2, 1, 97] // value = "a"
        }
    });
    obj = Foo.toObject(baz, { json: true });
    expect(obj.foo).toEqual({ '@type': '.Bar', 'bar': 'a' }); // should not care about prefix in type url
});

// test not in original repo
test('serialize and deserialize any', () => {
    const obj = {
        foo: {
            '@type': '.Bar',
            'bar': 'a'
        }
    };

    const foo = Foo.fromObject(obj);
    const anotherFoo = Foo.decode(Foo.encode(foo).finish());

    expect(Foo.toObject(foo, { json: true })).toEqual(obj);
});
