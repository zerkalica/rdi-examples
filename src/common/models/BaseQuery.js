/* @flow */

import type {QueryMap} from 'modern-router/i/routerInterfaces'

export default class BaseQuery {
    query: QueryMap;
    page: string;

    constructor(rec: {
        query: QueryMap,
        page: string
    }) {
        this.query = rec.query
        this.page = rec.page
    }
}
