export interface Adapter {
    gracefullShutdown(): Promise<void>;
}
