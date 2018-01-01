import { ConnectorPlugin, loadProto, loadProtoFromString } from '@any2api/gateway-common';
import { loadSync } from 'protobufjs';
import { join } from 'path';
import { GrpcConnectorConfig } from './config';
import { GrpcConnector } from './grpc-connector';

const connectorPlugin: ConnectorPlugin = {
    configurationTypes: loadSync(join(__dirname, '..', 'config.proto')),

    init: async (config: GrpcConnectorConfig) => {
        const instance = new GrpcConnector(config);

        const loadedProto = await (config.protoUrl ? 
            loadProto(config.protoUrl) :
            loadProtoFromString(config.protoDefinition));

        return {
            instance,
            serviceDefinition: loadedProto
        };
    }
};

export = connectorPlugin;
