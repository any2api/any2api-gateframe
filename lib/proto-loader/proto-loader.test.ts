import { loadProto } from "../proto-loader";

test('Test loading proto with google annotation', async () => {
    const proto = await loadProto( __dirname + '/proto-loader.test.proto');

    proto.lookupType('test.Request');
    proto.lookupType('test.Response');

    const service = proto.lookup('test.TestService.SayHello');

    expect(service.getOption('(google.api.http).body')).toBe('*');
    expect(service.getOption('(google.api.http).post')).toBe('/v1/example/echo');
});
