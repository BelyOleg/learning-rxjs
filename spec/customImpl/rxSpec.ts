import "jasmine";
import {LoggerObserver, asyncObservable, syncObservable} from "../../src/customImpl/rx";

describe('custom rxjs implementation', function() {

    it('test sync subscribe', function () {

        const loggerObserver = new LoggerObserver();

        spyOn(loggerObserver, 'next').and.callThrough();
        spyOn(console, 'log').and.callThrough();

        syncObservable.subscribe(loggerObserver);

        expect(loggerObserver.next).toHaveBeenCalled();

        expect(console.log).toHaveBeenCalled();

        expect(console.log).toHaveBeenCalledWith(11);
        expect(console.log).toHaveBeenCalledWith(32);
        expect(console.log).toHaveBeenCalledWith(443);
        expect(console.log).toHaveBeenCalledWith(54);
        expect(console.log).toHaveBeenCalledWith(15);

        expect(console.log).not.toHaveBeenCalledWith(1);
    });

    it('test async subscribe', function (done) {
        jasmine.clock().install();

        const loggerObserver = new LoggerObserver();

        spyOn(loggerObserver, 'next').and.callThrough();
        spyOn(console, 'log').and.callThrough();

        asyncObservable.subscribe(loggerObserver);

        jasmine.clock().tick(5000);

        expect(loggerObserver.next).toHaveBeenCalled();

        expect(console.log).toHaveBeenCalledWith(1);
        expect(console.log).toHaveBeenCalledWith(2);
        expect(console.log).toHaveBeenCalledWith(3);
        expect(console.log).toHaveBeenCalledWith(4);
        expect(console.log).toHaveBeenCalledWith(5);

        expect(console.log).not.toHaveBeenCalledWith(7);

        jasmine.clock().uninstall();

        done();
    });

    it('test map method', function () {
        const loggerObserver = new LoggerObserver();

        spyOn(console, 'log').and.callThrough();

        syncObservable
            .map((x: number) => x * 2 )
            .subscribe(loggerObserver);

        expect(console.log).toHaveBeenCalledWith(22);
        expect(console.log).toHaveBeenCalledWith(64);
    });

});