import * as grpc from 'grpc';

export interface GrpcAdapterConfig {
    port: string;
    
    insecure: boolean;
}
