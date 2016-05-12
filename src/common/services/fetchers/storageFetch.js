/* @flow */

import localServerActions from 'reactive-di-todomvc/common/services/fetchers/localServerActions'
import type {Fetch, FetchParams} from 'reactive-di-todomvc/common'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'

export default function storageFetch(storage: AbstractStorage): Fetch {
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
                return serverAction.execute(storage, params, match)
            }
        }

        return Promise.reject(new TypeError('Not found path'))
    }
}
