/**
 * Created by Bely Oleg on 16.07.2018.
 */


'use strict';

import "jasmine";
import {IObserver, ObservableImpl} from "../../src/pattern/observer";

describe('test pattern observer', function() {

    it('method update', function () {

        class Observer1 implements IObserver {
            update(): void {
            }
        }

        class Observer2 implements IObserver {
            update(): void {
            }
        }

        const observable = new ObservableImpl();
        const observer1 = new Observer1();
        const observer2 = new Observer2();

        spyOn(observer1, 'update').and.callThrough();
        spyOn(observer2, 'update').and.callThrough();

        observable.addObserver(observer1);
        observable.notifyObserver();

        expect(observer1.update).toHaveBeenCalledWith();
        expect(observer2.update).not.toHaveBeenCalledWith();

        observable.addObserver(observer2);
        observable.notifyObserver();

        expect(observer2.update).toHaveBeenCalledWith();
    });

    it('method remove', function () {

        class Observer1 implements IObserver {
            update(): void {
            }
        }

        class Observer2 implements IObserver {
            update(): void {
            }
        }

        const observable = new ObservableImpl();
        const observer1 = new Observer1();
        const observer2 = new Observer2();

        spyOn(observer1, 'update').and.callThrough();
        spyOn(observer2, 'update').and.callThrough();

        observable.addObserver(observer1);
        observable.addObserver(observer2);

        observable.notifyObserver();

        observable.removeObserver(observer1);

        observable.notifyObserver();

        expect(observer1.update).toHaveBeenCalledTimes(1);
        expect(observer2.update).toHaveBeenCalledTimes(2);
    });
});