import { Plugin } from '@any2api/gateway-common';

export interface Config {
    protoService?: ProtoService|null;
    
    connector?: PluginDefinition |null;

    intermediaries: PluginDefinition[];

    adapter: PluginDefinition;
}

export interface ProtoService {
    protoPackageName?: (string|null);
    
    protoDefinition?: (string|null);
    
    protoUrl?: (string|null);
    
    host: string;
    
    port: number;
}

export interface PluginDefinition {
    pluginName?: string;

    plugin?: Plugin;
    
    pluginConfig?: any|null;
}
