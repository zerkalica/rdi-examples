/* @flow */
import {Route} from 'modern-router'
import {RouteHook, QueryError} from 'rdi-helpers'
import type {IRouteParams} from 'rdi-helpers'
import {BaseModel} from 'reactive-di'
import {source, hooks} from 'reactive-di/annotations'

export type SelectedGroup = 'all' | 'active' | 'completed'

@source({key: 'TodoFilterParams'})
export default class TodoFilterParams extends BaseModel {
    selectedGroup: SelectedGroup = 'all'

    set: (rec: $Shape<this>) => any;
}

@hooks(TodoFilterParams)
class TodoFilterParamsHooks extends RouteHook<TodoFilterParams> {
    fromRoute({query}: Route): ?$Shape<TodoFilterParams> {
        const result: $Shape<TodoFilterParams> = {}
        switch (query.group) {
            case 'all':
            case 'active':
            case 'completed':
                result.selectedGroup = query.group
                break
            default:
                throw new QueryError('group', 'Error group')
        }

        return result
    }

    toRoute(next: TodoFilterParams): IRouteParams {
        return {
            params: {
                group: next.selectedGroup
            }
        }
    }
}
