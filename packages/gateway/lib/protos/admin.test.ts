import { join } from 'path';
import { Config } from './admin';

const packageName = 'some package';
const protoDefintion = 'syntax = "proto3";';
const protoUrl = 'https://foo.bar/service.proto';
const host = 'localhost';
const port = 1337;

test('proto service encode and decode test', () => {
    const proto = new Config.ProtoService();
    proto.protoPackageName = packageName;
    proto.protoDefinition = protoDefintion;
    proto.protoUrl = protoUrl;
    proto.host = host;
    proto.port = port;

    const buffer = Config.ProtoService.encode(proto).finish();
    const decoded = Config.ProtoService.decode(buffer);

    expect(decoded.protoPackageName).toBe(packageName);
    expect(decoded.protoUrl).toBe(protoUrl);

    // one of field is not automatically cleared 
    expect(decoded.protoDefinition).toBe(protoDefintion);
    
    expect(decoded.defOrUrl).toBe('protoUrl');
    expect(decoded.host).toBe(host);
    expect(decoded.port).toBe(port);
});

test('proto service automatically set definitionOrUrl', () => {
    const proto = new Config.ProtoService();
    expect(proto.defOrUrl).toBeUndefined();

    proto.protoUrl = protoUrl;
    expect(proto.defOrUrl).toBe('protoUrl');

    proto.protoDefinition = protoDefintion;
    expect(proto.defOrUrl).toBe('protoDefinition');
});
