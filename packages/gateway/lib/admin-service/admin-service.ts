import { Config } from './config';
import { AdapterPlugin, ConnectorPlugin, Plugin } from '@any2api/gateway-common';
import * as grpcConnector from '@any2api/grpc-connector';
import { AdapterInitResult, IntermediaryInitResult, ConnectorInitResult } from '@any2api/gateway-common';

interface ConfigInstance {
    adapter: AdapterInitResult;
    intermediaries: IntermediaryInitResult[];
    connector: ConnectorInitResult;
} 

/**
 * Service for management of configurations.
 */
export class AdminService {

    private idCounter = 0;
    private configDict: { [id: string]: { config: Config, instance: ConfigInstance } } = {};

    /**
     * 
     * @param config 
     * @returns promise of id of the created config.
     * A successful promise means all plugins of the config were succesfully started.
     */
    public createConfig(config: Config): Promise<string> {
        const id = String(++this.idCounter);

        return this.executeConfig(config)
            .then((instance) => {
                this.configDict[id] =  { config, instance };
                return id;
            });
    }

    public deleteConfig(id: string) {
        const config = this.configDict[id];
        return config.instance.adapter.instance.gracefullShutdown();
    }

    public getConfig(id: string): Config {
        return this.configDict[id].config;
    }

    private executeConfig = async (config: Config): Promise<ConfigInstance> => {
        const adapter = this.loadPlugin(config.adapter.pluginName) as AdapterPlugin;

        const connector = (config.protoService ?
            this.loadPlugin('@any2api/grpc-connector') : this.loadPlugin(config.connector.pluginName)
            ) as ConnectorPlugin;
        
        const connectorConfig = config.protoService ?
            { 
                address: `${config.protoService.host}:${config.protoService.port}`,
                insecure: true,
                protoDefinition: config.protoService.protoDefinition,
                protoUrl: config.protoService.protoUrl
            }
            : config.connector.pluginConfig;

        const connectorInitResult = await connector.init(connectorConfig);
        
        const adapterInitResult = await adapter.init(
            connectorInitResult.serviceDefinition,
            connectorInitResult.instance,
            config.adapter.pluginConfig);

        return { 
            adapter: adapterInitResult,
            intermediaries: [],
            connector: connectorInitResult
        };
    }

    private loadPlugin(packageName: string): Plugin {
        const plugin = require(packageName);

        if (!plugin) {
            throw new Error('Could not require plugin package');
        }

        return plugin;
    }
}
