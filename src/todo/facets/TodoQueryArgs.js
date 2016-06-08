/* @flow */
import {klass} from 'reactive-di/annotations'

import type {SelectedGroup} from 'reactive-di-todomvc/todo/i'

import {Route} from 'modern-router'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'

@klass()
export default class TodoQueryArgs {
    selectedGroup: SelectedGroup;
    error: ?QueryError;

    constructor(route: Route) {
        switch (route.query.group) {
            case 'all':
            case 'active':
            case 'completed':
                this.selectedGroup = route.query.group
                break
            default:
                throw new QueryError('group', 'Error group')
        }
    }
}
