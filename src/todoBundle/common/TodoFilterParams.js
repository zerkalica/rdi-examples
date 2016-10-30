/* @flow */
import {Route} from 'modern-router'
import {QueryError} from 'rdi-helpers'

export type SelectedGroup = 'all' | 'active' | 'completed'

export default class TodoFilterParams {
    selectedGroup: SelectedGroup

    constructor({query}: Route) {
        switch (query.group) {
            case 'all':
            case 'active':
            case 'completed':
                this.selectedGroup = query.group
                break
            default:
                throw new QueryError('group', 'Error group')
        }
    }
}
