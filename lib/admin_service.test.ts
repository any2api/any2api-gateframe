import { ProtoService, Config } from './admin_service';
import { loadProto } from './proto-loader';
import { join } from 'path';

const packageName = 'some package';
const protoDefintion = 'syntax = "proto3";';
const protoUrl = "https://foo.bar/service.proto";
const host = "localhost";
const port = 1337;

test('proto service encode and decode test', () => {
    const proto = new ProtoService();
    proto.protoPackageName = packageName;
    proto.protoDefinition = protoDefintion;
    proto.protoUrl = protoUrl;
    proto.host = host;
    proto.port = port;

    const buffer = ProtoService.encode(proto).finish();
    const decoded = ProtoService.decode(buffer);

    expect(decoded.protoPackageName).toBe(packageName);
    expect(decoded.protoUrl).toBe(protoUrl);

    // one of field is not automatically cleared 
    expect(decoded.protoDefinition).toBe(protoDefintion);
    
    expect(decoded.definitionOrUrl).toBe('protoUrl');
    expect(decoded.host).toBe(host);
    expect(decoded.port).toBe(port);
});

test('proto service automatically set definitionOrUrl', () => {
    const proto = new ProtoService();
    expect(proto.definitionOrUrl).toBeUndefined();

    proto.protoUrl = protoUrl;
    expect(proto.definitionOrUrl).toBe('protoUrl');

    proto.protoDefinition = protoDefintion;
    expect(proto.definitionOrUrl).toBe('protoDefinition');
});

test('annotated class and proto must be equal', async () => {
    const protoFile = await loadProto(join(__dirname, 'admin_service.proto'));

    const fileProtoServiceDefinition = protoFile.lookupType('.any2api.gateway.Config.ProtoService');

    expect(ProtoService.$type).toEqual(fileProtoServiceDefinition);
    
})

