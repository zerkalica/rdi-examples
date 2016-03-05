/* @flow */

import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
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
): Observable<Route, void> {
    return rm.changes.map(routeToBaseQuery)
}
