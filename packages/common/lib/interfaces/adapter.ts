export interface Adapter {
    /**
     * Should stop accepting new request and finish all inflight requests.
     * The Promise should be resolved after all inflight requests are finished.
     */
    gracefullShutdown(): Promise<void>;
}
