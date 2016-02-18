/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

type FetcherConfigRec = {
    apiPrefix?: string;
}

class FetcherConfig {
    apiPrefix: string;

    constructor(rec: FetcherConfigRec = {}) {
        this.apiPrefix = rec.apiPrefix || ''
    }
}
export default rdi.model(FetcherConfig)
