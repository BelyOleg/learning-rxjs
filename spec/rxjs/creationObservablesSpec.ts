import {Observable,from, range} from 'rxjs';
import {Subscriber} from "rxjs/src/internal/Subscriber";

describe('test creation observables', function() {

    it('create', function () {
        let result: string[] = [];

        const hello$ = Observable.create(function(observer: Subscriber<string>) {
            observer.next('Hello');
            observer.next('World');
        });

        hello$.subscribe((value: string) => result.push(value));

        expect(result).toEqual(['Hello', 'World']);
    });

    it('range', function () {
        let result: number[] = [];

        range(1, 3).subscribe(x => result.push(x));

        expect(result).toEqual([1,2,3]);
    });

    it('from', function () {
        let result: number[] = [];

        from([1, 2, 3]).subscribe(x => result.push(x));

        expect(result).toEqual([1,2,3]);
    });
});