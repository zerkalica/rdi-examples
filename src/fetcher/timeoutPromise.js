// @flow

class TimeoutError extends Error {
    statusCode: number
    constructor(timeout: number) {
        super('Request timeout client emulation: ' + (timeout / 1000) + 's')
        // $FlowFixMe new.target
        ;(this: Object)['__proto__'] = new.target.prototype
        this.statusCode = 408
    }
}

export default function timeoutPromise<D>(promise: Promise<D>, timeout?: ?number): Promise<D> {
    if (!timeout) return promise
    const tm = timeout

    return Promise.race([
        promise,
        new Promise((resolve: (data: D) => void, reject: (err: any) => void) => {
            setTimeout(() => reject(new TimeoutError(tm)), tm)
        })
    ])
}
