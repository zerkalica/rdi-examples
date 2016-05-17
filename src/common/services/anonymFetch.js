/* @flow */
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import type {
    FetchParams,
    Fetch
} from 'reactive-di-todomvc/common'

export default function anonymFetch<V>(
    {apiPrefix}: FetcherConfig,
    fetch: Fetch,
    /* @args */
    url: string,
    params: FetchParams
): Promise<V> {
    return fetch(`${apiPrefix}/${url}`, params)
}
