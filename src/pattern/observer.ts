export interface IObserver {
     update(): void
}

interface IObservable {
    addObserver(obs: IObserver): void;

    removeObserver(obs: IObserver): void;

    notifyObserver(): void
}

export class ObservableImpl implements IObservable {
    private _observers: IObserver[] = [];

    addObserver(obs: IObserver): void {
        this._observers.push(obs);
    }

    removeObserver(obs: IObserver): void {
        const index = this._observers.indexOf(obs);

        if (index !== -1) {
            this._observers.splice(index, 1);
        }
    }

    notifyObserver(): void {
        this._observers.forEach(function(item) {
            item.update();
        });
    }
}
