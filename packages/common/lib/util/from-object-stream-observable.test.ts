import { Readable } from 'stream';
import { FromObjectStreamObservable } from './from-object-stream-observable';

test('stream observable', (done) => {
    expect.assertions(1);

    const array = [1, 2, 3];
    const readable = new Readable({objectMode: true});

    new FromObjectStreamObservable(readable)
        .toArray()
        .subscribe((r) => expect(r).toEqual(array), null, done);

    array.forEach((e) => readable.push(e));

    readable.push(null);
});
