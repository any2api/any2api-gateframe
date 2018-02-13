import { loadProto, loadProtoFromString } from './proto-loader';

test('Test loading proto with google annotation', async () => {
    const proto = await loadProto( __dirname + '/proto-loader.test.proto');

    proto.lookupType('test.Request');
    proto.lookupType('test.Response');

    const service = proto.lookup('test.TestService.SayHello');

    expect(service.getOption('(google.api.http).body')).toBe('*');
    expect(service.getOption('(google.api.http).post')).toBe('/v1/example/echo');
});

test('load inline proto', async () => {
    const protoString = 'syntax = "proto3"; message M { string foo = 1; }';
    const proto = await loadProtoFromString(protoString);

    const messageType = proto.lookupType('.M');

    expect(messageType.fieldsArray.length).toBe(1);

    const field = messageType.fieldsArray[0];

    expect(field.name).toBe('foo');
    expect(field.id).toBe(1);
});
