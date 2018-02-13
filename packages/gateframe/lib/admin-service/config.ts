import { Plugin } from '@any2api/gateframe-common';

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

/**
 * The plugin definition is interpreted in the following way:
 * 1. If the plugin value is set it is used as the plugin.
 * 2. Else the package defined in packageName is loaded (using require).
 * 2.1. If pluginName is set the field of the package with this name is used a plugin.
 * 2.2. Else the whole package is used as plugin.
 * 
 * pluginConfig is passed to the plugin and the plugin itself has to valide it.
 */
export interface PluginDefinition {
    packageName?: string;

    pluginName?: string;

    plugin?: Plugin;
    
    pluginConfig?: any|null;
}
