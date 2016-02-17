/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

export type QueryMap = {[id: string]: string};

class BaseQuery {
    query: QueryMap;
    page: string;

    constructor() {
        this.query = {}
        // TODO: attach to router
        this.page = 'TodoAppPage'
    }
}

export default rdi.klass(
)(BaseQuery)
