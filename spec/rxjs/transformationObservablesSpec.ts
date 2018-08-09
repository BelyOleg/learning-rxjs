import {Observable, of} from 'rxjs';
import {buffer, map, scan, switchMap, take} from "rxjs/internal/operators";
import {interval} from "rxjs/index";

describe('test transformation observables', function() {

    it('map', function () {
        let result: number[] = [];

        const source$: Observable<number> = of(0,1,2)
            .pipe(map((x: number) => x *2));

        source$.subscribe((value: number) => {
            result.push(value)
        });

        expect(result).toEqual([0, 2, 4]);
    });

    it('buffer', function (done) {
        let result: number[][] = [];

        const source$: Observable<number[]> = interval(100)
            .pipe(
                buffer(interval(225)),
                take(3)
            );

        jasmine.clock().install();

        source$.subscribe((value: number[]) => {
            result.push(value);
        });

        jasmine.clock().tick(2000);
        jasmine.clock().uninstall();

        expect(result).toEqual([[0,1], [2,3], [4,5]]);

        done();
    });

    it('scan', function () {
        let result: number = 0;

        const source$: Observable<number> = of(0,1,2)
            .pipe(scan((accumulatedValue: number, currentValue: number) => accumulatedValue + currentValue));

        source$.subscribe((value: number) => {
            result = value;
        });

        expect(result).toEqual(3);
    });

    it('switch map', function (done) {
        let result: number[] = [];

        const source$: Observable<number> = interval(225)
            .pipe(
                switchMap(() => interval(100)),
                take(6)
            );

        jasmine.clock().install();

        source$.subscribe((value: number) => {
            result.push(value);
        });

        jasmine.clock().tick(2000);
        jasmine.clock().uninstall();

        expect(result).toEqual([0,1,0,1,0,1]);

        done();
    });

});