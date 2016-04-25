/* @flow */

import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import type {
    OperationItem
} from 'reactive-di-observable/i/interfaces'

import type {
    Route,
    RouterManager
} from 'modern-router/i/routerInterfaces'

function routeToBaseQuery(route: Route): BaseQuery {
    return new BaseQuery(route)
}

export default function LoadableBaseQuery(
    query: BaseQuery,
    rm: RouterManager
): Array<OperationItem> {
    return [
        {observable: rm.changes.map(routeToBaseQuery)}
    ]
}
