/* @flow */

import type {QueryMap} from 'modern-router/i/routerInterfaces'

type BaseQueryRec = {
    query?: QueryMap,
    page?: string
}

export default class BaseQuery {
    query: QueryMap;
    page: string;

    constructor(rec: BaseQueryRec = {}) {
        this.query = rec.query || {}
        this.page = rec.page || ''
    }
}
