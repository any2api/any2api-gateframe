import { Observable } from '@reactivex/rxjs';
import { RequestParameters, Call } from './request';
import { Callable } from '../index';
import { InfoProvider } from './info-provider';

// tslint:disable-next-line:no-empty-interface
export interface Intermediary extends Callable, InfoProvider {
    /**
     * Should stop accepting new request and finish all inflight requests.
     * The Promise should be resolved after all inflight requests are finished.
     * If the intermediary adds some additional endpoints they can be closed on this event.
     */
    gracefullShutdown?(): Promise<void>;
}
