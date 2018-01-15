import { RequestParameters, Call } from './request';
import { Observable } from '@reactivex/rxjs';

/**
 * Generic call interface to be implemented by all intermediaries and connectors
 */
export interface Callable {
    makeRequest(parameters: RequestParameters): Observable<Call>;
}
