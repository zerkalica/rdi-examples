/* @flow */
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import {klass} from 'reactive-di/annotations'

import type {
    FetchParams,
    Fetch
} from 'reactive-di-todomvc/i/commonInterfaces'

export default class Fetcher {
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
klass(Fetcher)
