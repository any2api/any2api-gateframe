import { InfoProvider } from "./info-provider";

export interface Adapter extends InfoProvider {
    /**
     * Should stop accepting new request and finish all inflight requests.
     * The Promise should be resolved after all inflight requests are finished.
     */
    gracefullShutdown(): Promise<void>;
}
