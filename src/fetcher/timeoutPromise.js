// @flow

/**
 * Can't extend Error
 * @see https://github.com/babel/babel/issues/7447
 */
class TimeoutError {
    statusCode: number
    constructor(timeout: number) {
        const t: TimeoutError & Error = (Error.call(this, 'Request timeout client emulation: ' + (timeout / 1000) + 's'): any)
        // $FlowFixMe new.target
        ;(t: Object)['__proto__'] = new.target.prototype
        t.statusCode = 408
        return t
    }
}
;(TimeoutError: any).prototype = Object.create(Error.prototype)
;(TimeoutError: any).prototype.constructor = TimeoutError
const TimeoutErrorInt: Class<TimeoutError & Error> = (TimeoutError: any)

export {TimeoutErrorInt as TimeoutError}

export default function timeoutPromise<D>(
    promise: Promise<D>,
    timeout?: ?number
): Promise<D> {
    if (!timeout) return promise
    const tm = timeout

    return Promise.race([
        promise,
        new Promise((resolve: (data: D) => void, reject: (err: any) => void) => {
            setTimeout(() => reject(new TimeoutError(tm)), tm)
        })
    ])
}
