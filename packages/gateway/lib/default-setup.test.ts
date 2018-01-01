import { AdminService, Config } from './admin-service';
import { getPortPromise } from 'portfinder';
import * as grpc from 'grpc';
import * as ProtoBuf from 'protobufjs';
import { writeFile } from 'fs';
import * as tmp from 'tmp-promise';

const protoDefinition = 'syntax = "proto3"; message M { string bar = 1; } service S { rpc foo(M) returns (M); }';
let tempProtoFile: {path: string, cleanup: () => void };
let protoRoot: ProtoBuf.Root;
let messageType: ProtoBuf.Type;
let service;

let grpcServer: grpc.Server;
let grpcServerPort: number;

let gatewayGrpcPort: number;

const loadProto = async () => {
    tempProtoFile = await tmp.file({postfix: '.proto'});

    // write proto to temp file, as protobufjs needs a filename
    await new Promise<void>((resolve, reject) => {
        writeFile(tempProtoFile.path, protoDefinition, (err) => {
            if (err) { return reject(err); }

            resolve();
        });
    });

    protoRoot = await ProtoBuf.load(tempProtoFile.path);
    messageType = protoRoot.lookupType('.M');

    service = grpc.loadObject(protoRoot.lookupService('.S'));
};

const createGrpcServer = async () => {
    grpcServerPort = await getPortPromise();

    grpcServer = new grpc.Server();
    
    grpcServer.addService(
        service.service,
        { foo: (call, callback) => callback(null, { bar: 'foo' + call.request.bar } ) });
    
    grpcServer.bind(`0.0.0.0:${grpcServerPort}`, grpc.ServerCredentials.createInsecure());

    grpcServer.start();
};

const createGateway = async () => {
    gatewayGrpcPort = await getPortPromise();

    const adminService = new AdminService();
    
    const config: Config = {
        protoService: {
            protoDefinition,
            host: 'localhost',
            port: grpcServerPort
        },
        adapter: {
            pluginName: '@any2api/grpc-adapter',
            pluginConfig: {
                insecure: true,
                port: `0.0.0.0:${gatewayGrpcPort}`
            }
        },
        intermediaries: []
    };

    const id = await adminService.createConfig(config);

    console.log(id);
};

beforeAll(async () => {
    await loadProto();
    await createGrpcServer();
    await createGateway();

    tempProtoFile.cleanup();
});

afterAll(() => {
    grpcServer.forceShutdown();
});

test('basic server test', (done) => {
    const client = new service(
        `localhost:${grpcServerPort}`,
        grpc.credentials.createInsecure());

    client.foo({ bar: 'bar' }, (err, response) => {
        expect(err).toBeNull();
        expect(response.bar).toBe('foobar');
        done();
    });
});

test('basic gateway test', (done) => {
    const client = new service(
        `localhost:${gatewayGrpcPort}`,
        grpc.credentials.createInsecure());

    client.foo({ bar: 'bar' }, (err, response) => {
        expect(err).toBeNull();
        expect(response.bar).toBe('foobar');
        done();
    });
});
