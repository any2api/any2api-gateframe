import { Config } from './config';
import { AdapterPlugin, ConnectorPlugin, Plugin } from '@any2api/gateway-common';
import * as grpcConnector from '@any2api/grpc-connector';

/**
 * Service for management of configurations.
 */
export class AdminService {

    private idCounter = 0;
    private configDict: { [id: string]: Config } = {};

    /**
     * 
     * @param config 
     * @returns promise of id of the created config.
     * A successful promise means all plugins of the config were succesfully started.
     */
    public createConfig(config: Config): Promise<string> {
        const id = String(++this.idCounter);

        return this.executeConfig(config)
            .then(() => {
                this.configDict[id] = config;
                return id;
            });
    }

    public deleteConfig(id: string) {
        throw new Error('delete Config is not implemented yet!');
    }

    public getConfig(id: string): Config {
        return this.configDict[id];
    }

    private executeConfig = async (config: Config) => {
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
        
        const adapterInstance = await adapter.init(
            connectorInitResult.serviceDefinition,
            connectorInitResult.instance,
            config.adapter.pluginConfig);
    }

    private loadPlugin(packageName: string): Plugin {
        const plugin = require(packageName);

        if (!plugin) {
            throw new Error('Could not require plugin package');
        }

        return plugin;
    }
}
