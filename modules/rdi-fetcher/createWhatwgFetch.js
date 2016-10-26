// @flow

import FetcherConfig from './FetcherConfig'
import type {Fetch, FetchOptions} from './createFetch'
import HttpError from './HttpError'

function toJson<V>(r: Response): Promise<V> {
    if (r.status >= 200 && r.status < 300) {
        return r.json()
    }

    return r.json()
        .then((data: Object) => {
            throw new HttpError(r.status, data.message || r.statusText, data.code)
        })
}

export default function createWhatwgFetch({baseUrl}: FetcherConfig): Fetch<*> {
    return function whatwgFetch<V>(url: string, options: FetchOptions): Promise<V> {
        /* eslint-disable no-undef */
        return fetch(baseUrl + url, options)
            .then(toJson)
    }
}
