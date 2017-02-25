/* @flow */
import {Route} from 'modern-router'
import {QueryError} from 'rdi-helpers'
import {getSrc} from 'reactive-di'
import {source, hooks} from 'reactive-di/annotations'

export type SelectedGroup = 'all' | 'active' | 'completed'

@source({key: 'TodoFilterParams'})
export default class TodoFilterParams {
    selectedGroup: SelectedGroup = 'all'
}

@hooks(TodoFilterParams)
class TodoFilterParamsHooks {
    _route: Route

    constructor(route: Route) {
        this._route = route
    }

    selfUpdate(fp: TodoFilterParams) {
        this.willMount(fp)
    }

    willMount(fp: TodoFilterParams) {
        const query = this._route.query
        switch (query.group) {
            case 'all':
            case 'active':
            case 'completed':
                getSrc(fp).merge({
                    selectedGroup: query.group
                })
                break
            default:
                throw new QueryError('group', 'Error group')
        }
    }

    willUpdate(fp: TodoFilterParams) {
        const route = this._route
        getSrc(route).merge({
            query: {
                ...route.query,
                group: fp.selectedGroup
            }
        })
    }
}
