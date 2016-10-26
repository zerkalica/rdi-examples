// @flow

import EmulatedApiParams from './EmulatedApiParams'

export type DelayedResult<V> = (data: Promise<V>) => Promise<V>

export default function createDelayedResult(
    {delay, errorRate}: EmulatedApiParams
): DelayedResult<*> {
    function delayedPromise(resolve: () => void, reject: (err: Error) => void) {
        if (Math.ceil(Math.random() * 100) <= errorRate) {
            setTimeout(() => reject(new Error('Fake server error')), delay)
            return
        }
        setTimeout(() => resolve(), delay)
    }

    return function delayedResult<V>(data: Promise<V>): Promise<V> {
        return (new Promise(delayedPromise)).then(() => data)
    }
}
