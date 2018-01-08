import { AdminService, Config } from './admin-service';
import { getPortPromise } from 'portfinder';
import * as grpc from 'grpc';
import * as ProtoBuf from 'protobufjs';
import { writeFile } from 'fs';
import * as tmp from 'tmp-promise';
import { loadProtoFromString, IntermediaryPlugin, IntermediaryInitResult,
    RequestParameters } from '@any2api/gateway-common';

const protoDefinition = 'syntax = "proto3"; message M { string bar = 1; } service S { rpc foo(M) returns (M); }';
let protoRoot: ProtoBuf.Root;
let messageType: ProtoBuf.Type;
let service;

let grpcServer: grpc.Server;
let grpcServerPort: number;

let gatewayGrpcPort: number;

const adminService = new AdminService();
let configId;

const loadProto = async () => {
    protoRoot = await loadProtoFromString(protoDefinition);
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

let requestThroughIntermediary: any[];
let responseThroughIntermediary: any[];

beforeEach(() => {
    requestThroughIntermediary = [];
    responseThroughIntermediary = [];
});

const mockIntermediary: IntermediaryPlugin = {
    init: (serviceDef, upstream) => {
        const initResult = {
            instance: {
                makeRequest: (requestParameters: RequestParameters) => {
                    requestParameters.requestObservable = requestParameters.requestObservable
                        .do((r) => requestThroughIntermediary.push(r.getMessage()));

                    return upstream.makeRequest(requestParameters)
                        .map((call) => {
                            call.responseObservable = call.responseObservable.do(
                                (r) => responseThroughIntermediary.push(r.getMessage())
                            );
                            return call;
                        });
                }
            }
        };
        return initResult;
    }
};

const createGateway = async () => {
    gatewayGrpcPort = await getPortPromise({ port: 9000 });
    
    const config: Config = {
        protoService: {
            protoDefinition,
            host: 'localhost',
            port: grpcServerPort
        },
        intermediaries: [ { plugin: mockIntermediary }],
        adapter: {
            pluginName: '@any2api/grpc-adapter',
            pluginConfig: {
                insecure: true,
                port: `0.0.0.0:${gatewayGrpcPort}`
            }
        }
    };

    configId = await adminService.createConfig(config);
};

beforeAll(async () => {
    await loadProto();
    await createGrpcServer();
    await createGateway();
});

afterAll(() => {
    grpcServer.forceShutdown();
    adminService.deleteConfig(configId);
});

test('basic server test', (done) => {
    const client = new service(
        `localhost:${grpcServerPort}`,
        grpc.credentials.createInsecure());

    client.foo({ bar: 'bar' }, (err, response) => {
        expect(err).toBeNull();
        expect(response.bar).toBe('foobar');

        expect(requestThroughIntermediary).toEqual([]);
        expect(responseThroughIntermediary).toEqual([]);
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

        expect(requestThroughIntermediary).toEqual([{ bar: 'bar' }]);
        expect(responseThroughIntermediary).toEqual([{ bar: 'foobar' }]);

        done();
    });
});
