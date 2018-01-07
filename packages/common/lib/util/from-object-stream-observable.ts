import * as grpc from 'grpc';
import { Readable } from 'stream';
import { Observable, Subscriber, Subscription } from '@reactivex/rxjs';

// Observable from readable object stream
export class FromObjectStreamObservable<T> extends Observable<T> {
  constructor(
      private sourceObj: Readable) {
      super();
  }

  protected _subscribe(subscriber: Subscriber<T>) {
    const sourceObj = this.sourceObj;
    const handler = (e) => subscriber.next(e);
    const error = (e) => subscriber.error(e);
    const completed = () => subscriber.complete();

    const source = sourceObj;
    sourceObj.addListener('data', handler);
    sourceObj.addListener('error', error);
    sourceObj.addListener('end', completed);
    
    const unsubscribe = () => {
      source.removeListener('data', handler);
      source.removeListener('error', error);
      source.removeListener('end', completed);
    };

    subscriber.add(new Subscription(unsubscribe));
  }
}
