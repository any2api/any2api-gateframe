export interface GrpcConnectorConfig {
    address: string;

    insecure?: boolean;

    protoDefinition?: string;

    protoUrl?: string;
}
