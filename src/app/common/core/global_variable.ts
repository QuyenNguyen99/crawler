export class Deferred<T> {
    promise: Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export class GlobalVariable {
    static DEFER = new Deferred();
    static DASHBOARD_INTERVAL: any=false;
    static DASHBOARD_REQUEST_BY_SALE_INTERVAL: any=false;
    static DASHBOARD_TIMEOUT: number = 10000;
}