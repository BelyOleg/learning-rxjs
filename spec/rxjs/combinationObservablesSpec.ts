import {concat, interval, merge, Observable, of} from 'rxjs';
import {mapTo} from "rxjs/internal/operators";

describe('test combination observables', function() {

    it('concat', function () {
        let result: number[] = [];

        const source1$: Observable<number> = of(1,2);
        const source2$:Observable<number> = of(3,4);

        const concatedSource$:Observable<number> = concat(source1$, source2$);

        concatedSource$.subscribe((x: number) => result.push(x));

        expect(result).toEqual([1,2,3,4]);
    });

    it('merge', function () {
        let result: number[] = [];

        const source1$: Observable<number> = interval(500).pipe(mapTo(1));
        const source2$:Observable<number> = interval(1000).pipe(mapTo(2));

        const mergedSource$:Observable<number> = merge(source1$, source2$);

        jasmine.clock().install();

        const subscription = mergedSource$.subscribe((x: number) => {
            result.push(x)
        });

        jasmine.clock().tick(2000);
        jasmine.clock().uninstall();

        subscription.unsubscribe();

        expect(result).toEqual([1,2,1,1,2,1]);
    });
});