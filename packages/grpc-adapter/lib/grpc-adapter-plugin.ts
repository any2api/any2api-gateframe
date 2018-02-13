import { AdapterPlugin, Callable } from '@any2api/gateframe-common';
import * as ProtoBuf from 'protobufjs';
import { GrpcAdapterConfig } from './grpc-adapter-config';
import { loadSync } from 'protobufjs';
import { join } from 'path';
import { GrpcAdapter } from './grpc-adapter';

export const grpcAdapterPlugin: AdapterPlugin = {
    init: async (serviceDefinition: ProtoBuf.Namespace, upstream: Callable, config?: GrpcAdapterConfig) => {

        if (!config || !config.port) {
            throw new Error('The port of the configuration for the Grpc-Adapter must be set.');
        }

        const adapter = new GrpcAdapter(config, upstream);

        const info = await adapter.register(serviceDefinition);

        return {
            instance: adapter,
            info
        };
    },
    configurationTypes: loadSync(join(__dirname, '..', 'config.proto'))
};
