/* @flow */

import rdi from '../../common/annotations'

export type QueryMap = {[id: string]: string};

class BaseQuery {
    query: QueryMap;
    page: string;

    constructor() {
        this.query = {}
        this.page = 'TodoAppPage'
    }
}

export default rdi.klass(
)(BaseQuery)
