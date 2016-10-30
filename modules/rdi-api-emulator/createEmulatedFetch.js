// @flow
import type {ResultOf} from 'reactive-di'

import {HttpError} from 'rdi-fetcher'
import type {Fetch, FetchOptions} from 'rdi-fetcher'

import EmulatedApi from './EmulatedApi'
import createDelayedResult from './createDelayedResult'

export default function createEmulatedFetch(
    delayedResult: ResultOf<typeof createDelayedResult>,
    emulatedApi: EmulatedApi
): Fetch<*> {
    return function emulatedFetch(url: string, options: FetchOptions): Promise<*> {
        const items = emulatedApi.items
        for (let i = 0, l = items.length; i < l; i++) {
            const serverAction = items[i]
            if (serverAction.method === options.method) {
                const match = url.match(serverAction.url)
                if (match) {
                    const bodyStr = options.body ? (' ' + JSON.stringify(options.body, null, '  ')) : ''
                    console.log(`${options.method || 'GET'} ${url}${bodyStr}`) //eslint-disable-line
                    return delayedResult(serverAction.execute(options, match))
                }
            }
        }

        return Promise.reject(new HttpError(404, 'Endpoint not found'))
    }
}
