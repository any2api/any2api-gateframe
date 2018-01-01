import { RequestParameters, Call } from './request';
import { Observable } from '@reactivex/rxjs';

export interface Callable {
    makeRequest(parameters: RequestParameters): Observable<Call>;
}
