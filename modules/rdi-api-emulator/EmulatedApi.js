// @flow

import type {FetchOptions} from 'rdi-fetcher'

export interface ApiRec {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: RegExp;
    execute(params: FetchOptions, match: string[]): Promise<*>;
}

export default class EmulatedApi {
    items: ApiRec[]

    constructor(items: ApiRec[]) {
        this.items = items
    }
}
