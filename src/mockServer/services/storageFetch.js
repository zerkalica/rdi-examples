/* @flow */

import {factory} from 'reactive-di/annotations'

import localServerActions from 'reactive-di-todomvc/mockServer/services/localServerActions'
import type {Fetch, FetchParams} from 'reactive-di-todomvc/common/i'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import type {ErrorRateValue} from 'reactive-di-todomvc/mockServer/i'

function delayedResult(getData: () => any, errorRate: ErrorRateValue): Promise<any> {
    return new Promise((resolve, reject) => {
        // if (Math.ceil(Math.random() * 100) <= errorRate) {
        //     setTimeout(() => reject(new Error('Fake server error')), 700)
        // } else
        {
            setTimeout(() => {
                try {
                    const data = getData()
                    resolve(data)
                } catch (e) {
                    reject(e)
                    throw e
                }
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
                console.log('fetch: ', url, params)
                return delayedResult(serverAction.execute(storage, params, match), errorRate)
                    .then((data: mixed) => {
                        console.log('fetch result:', url, data)
                        return data
                    })
                    .catch((err: Error) => {
                        console.error('fetch:', url, err)
                        throw err
                    })
            }
        }

        return Promise.reject(new TypeError('Not found path'))
    }
}
factory()(storageFetch)
