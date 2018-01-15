import { ConnectorPlugin, loadProto, loadProtoFromString } from '@any2api/gateframe-common';
import { loadSync } from 'protobufjs';
import { join } from 'path';
import { GrpcConnectorConfig } from './config';
import { GrpcConnector } from './grpc-connector';

export const connectorPlugin: ConnectorPlugin = {
    configurationTypes: loadSync(join(__dirname, '..', 'config.proto')),

    init: async (config: GrpcConnectorConfig) => {
        if (!config || !config.address) {
            throw new Error('The address of the configuration for the grpc connector must be set.');
        }

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
