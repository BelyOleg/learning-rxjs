interface IObservable {
    subscribe(obs: IObserver): void;

    map(mapFn: Function): IObservable;
}

interface IObserver {
    next(value: any): void;

    complete(): void;

    error(message: string): void;
}

class Observable implements IObservable {
    subscribe(obs: IObserver): void {

    }

    map(mapFormatterFn: Function): IObservable {
        const inputObservable: IObservable = this;

        return Observable.createObservable(function (obs: IObserver) {
            class DecoratorObserver implements IObserver {
                next(value: any): void {
                    obs.next(mapFormatterFn(value))
                }

                complete(): void {
                    obs.complete();
                }

                error(message: string): void {
                    obs.error(message);
                }

            }

            inputObservable.subscribe(Object.assign(new DecoratorObserver()))
        });
    }

    static createObservable(subscribeFn: Function): IObservable {
        return Object.assign(new this(), {
            subscribe: subscribeFn
        });
    }
}

export class LoggerObserver implements IObserver {
    next(value: any): void {
        console.log(value)
    }

    complete(): void {
        console.log('complete')
    }

    error(message: string): void {
        console.log(message)
    }
}

export let syncObservable = Observable.createObservable(function (obs: IObserver) {
    [11,32,443,54,15].forEach(obs.next);
    obs.complete();
});

export let asyncObservable = Observable.createObservable(function (obs: IObserver) {
    let counter: number = 0;

    const intervalId: number = setInterval(()=> {
        counter++;

        obs.next(counter);

        if(counter > 5){
            obs.complete();
            clearInterval(intervalId);
        }
    }, 500);
});



