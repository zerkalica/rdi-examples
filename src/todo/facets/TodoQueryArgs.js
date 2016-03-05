/* @flow */
import type {SelectedGroup} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Route} from 'modern-router/i/routerInterfaces'

export default class TodoQueryArgs {
    selectedGroup: SelectedGroup;

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
                if (!route.query.group) {
                    this.selectedGroup = 'all'
                } else {
                    throw new Error('Wrong group')
                }
        }
    }
}
