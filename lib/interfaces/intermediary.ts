import { Observable } from '@reactivex/rxjs';
import { RequestParameters, Call } from './request';

export interface Intermediary {
    makeRequest(
        parameters: RequestParameters,
        next: (parameters: RequestParameters) => Observable<Call>
    ): Observable<Call>;
}
