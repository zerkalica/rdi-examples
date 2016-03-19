/* @flow */
import type {SelectedGroup} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Route} from 'modern-router/i/routerInterfaces'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'

export default class TodoQueryArgs {
    selectedGroup: SelectedGroup;
    error: ?QueryError;

    constructor(
        route: Route
    ) {
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