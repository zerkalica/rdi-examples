/* @flow */

import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import type {
    Operation
} from 'reactive-di-observable/i/interfaces'

import type {
    Route,
    RouterManager
} from 'modern-router/i/routerInterfaces'

function routeToBaseQuery(route: Route): Array<Operation> {
    return [
        {
            object: new BaseQuery(route)
        }
    ]
}

export default function BaseQueryLoader(rm: RouterManager): Array<Operation> {
    return [
        {observable: rm.changes.map(routeToBaseQuery)}
    ]
}
