/* @flow */

import {observable} from 'reactive-di-observable/annotations'

type FetcherConfigRec = {
    apiPrefix?: string;
}

@observable({key: 'FetcherConfig'})
export default class FetcherConfig {
    apiPrefix: string;

    constructor(rec: FetcherConfigRec = {}) {
        this.apiPrefix = rec.apiPrefix || ''
    }
}
