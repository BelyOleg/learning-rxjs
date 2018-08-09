import {Observable, of} from 'rxjs';
import {filter, skip, throttle} from "rxjs/internal/operators";
import {interval, Subscription} from "rxjs/index";

describe('test filtering observables', function() {

    it('filter', function () {
        let result: number[] = [];

        const source$: Observable<number> = of(0,1,2)
            .pipe(filter((x: number) => x > 1));

        source$.subscribe((value: number) => {
            result.push(value)
        });

        expect(result).toEqual([2]);
    });

    it('throttle', function () {
        let result: number[] = [];

        const source1$: Observable<number> = interval(500);

        const throttleSource$: Observable<number> = source1$.pipe(
            throttle(() => interval(2000))
        );

        jasmine.clock().install();

        const subscription: Subscription = throttleSource$.subscribe((x: number) => {
            result.push(x)
        });

        jasmine.clock().tick(5000);
        jasmine.clock().uninstall();

        subscription.unsubscribe();

        expect(result).toEqual([0,4,8]);
    });

    it('skip', function () {
        let result: number[] = [];

        const source$: Observable<number> = of(0,1,2)
            .pipe(skip(2));

        source$.subscribe((value: number) => {
            result.push(value)
        });

        expect(result).toEqual([2]);
    });
});