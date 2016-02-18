/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import localStorageFetch from 'reactive-di-todomvc/common/services/fetchers/localStorageFetch'
import type {
    FetchParams,
    Fetch
} from 'reactive-di-todomvc/i/commonInterfaces'

class Fetcher {
    _apiPrefix: string;
    _fetch: Fetch;

    constructor(options: FetcherConfig, fetch: Fetch) {
        this._apiPrefix = options.apiPrefix || ''
        this._fetch = fetch
    }

    load<V>(url: string, params: FetchParams): Promise<V> {
        return this._fetch(`${this._apiPrefix}/${url}`, params)
    }
}

export default rdi.klass(FetcherConfig, localStorageFetch)(Fetcher)
