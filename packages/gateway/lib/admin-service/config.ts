export interface Config {
    protoService?: ProtoService|null;
    
    connector?: Plugin|null;

    intermediaries: Plugin[];

    adapter: Plugin;
}

export interface ProtoService {
    protoPackageName?: (string|null);
    
    protoDefinition?: (string|null);
    
    protoUrl?: (string|null);
    
    host: string;
    
    port: number;
}

export interface Plugin {
    pluginName: string;
    
    pluginConfig?: any|null;
}
