/* @flow */

import {observable} from 'reactive-di-observable/annotations'

type FetcherConfigRec = {
    apiPrefix?: string;
}

export default class FetcherConfig {
    apiPrefix: string;

    constructor(rec: FetcherConfigRec = {}) {
        this.apiPrefix = rec.apiPrefix || ''
    }
}
observable(FetcherConfig)
