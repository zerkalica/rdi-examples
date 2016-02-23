/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import localServerActions from 'reactive-di-todomvc/common/services/fetchers/localServerActions'
import type {Fetch, FetchParams} from 'reactive-di-todomvc/i/commonInterfaces'

import type {ServerAction} from 'reactive-di-todomvc/common/services/fetchers/localServerActions'

function createLocalStorageFetch(serverActions: Array<ServerAction>): Fetch {
    const storage: Storage = window.localStorage;

    return function localStorageFetch<V>(
        url: string,
        params: FetchParams<V> = {
            method: 'GET'
        }
    ): Promise<V> {
        for (let i = 0, l = serverActions.length; i < l; i++) {
            const serverAction = serverActions[i]
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
export default rdi.factory(localServerActions)(createLocalStorageFetch)
