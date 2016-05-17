/* @flow */

import localServerActions from 'reactive-di-todomvc/mockServer/services/localServerActions'
import type {Fetch, FetchParams} from 'reactive-di-todomvc/common'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import type {ErrorRateValue} from 'reactive-di-todomvc/mockServer'

function delayedResult(getData: () => any, errorRate: ErrorRateValue): Promise<any> {
    return new Promise((resolve, reject) => {
        if (Math.ceil(Math.random() * 100) <= errorRate) {
            setTimeout(() => reject(new Error('Fake server error')), 700)
        } else {
            setTimeout(() => {
                resolve(getData())
            }, 1500)
        }
    })
}

export default function storageFetch(
    storage: AbstractStorage,
    errorRate: ErrorRateValue
): Fetch {
    return function _storageFetch<V: Object>(
        url: string,
        params: FetchParams<V> = {
            method: 'GET'
        }
    ): Promise<V> {
        for (let i = 0, l = localServerActions.length; i < l; i++) {
            const serverAction = localServerActions[i]
            if (serverAction.method !== params.method) {
                continue
            }
            const match = url.match(serverAction.url)
            if (match) {
                return delayedResult(serverAction.execute(storage, params, match), errorRate)
            }
        }

        return Promise.reject(new TypeError('Not found path'))
    }
}
