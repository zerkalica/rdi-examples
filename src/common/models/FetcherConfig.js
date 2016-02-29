/* @flow */

type FetcherConfigRec = {
    apiPrefix?: string;
}

export default class FetcherConfig {
    apiPrefix: string;

    constructor(rec: FetcherConfigRec = {}) {
        this.apiPrefix = rec.apiPrefix || ''
    }
}
