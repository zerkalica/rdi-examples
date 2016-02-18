/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import BaseQuery from 'reactive-di-todomvc/common/facets/BaseQuery'

class TodoQuery {
    userId: string;
    error: Error;

    constructor(query: BaseQuery) {
        /* eslint-disable dot-notation */
        this.userId = (query['userId'] || '').trim()
        if (!this.userId) {
            this.error = new TypeError('User id is empty')
        }
    }
}

export default rdi.klass(BaseQuery)(TodoQuery)
