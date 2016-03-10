/* @flow */
import type {SelectedGroup} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Route} from 'modern-router/i/routerInterfaces'
import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'

export default class TodoQueryArgs {
    selectedGroup: SelectedGroup;
    error: ?string;

    constructor(
        route: Route,
        tr: Tr
    ) {
        switch (route.query.group) {
            case 'all':
            case 'active':
            case 'completed':
                this.selectedGroup = route.query.group
                break
            default:
                this.error = tr('Error group')
                this.selectedGroup = 'all'
                break
        }
    }
}
