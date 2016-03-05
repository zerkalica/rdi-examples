/* @flow */

import type {GetDep} from 'reactive-di/i/diInterfaces'

import type {
    RootComponentProps
} from 'reactive-di-react/i/interfaces'
import type {
    RouteManager,
    Route
} from 'modern-router/i/routerInterfaces'

import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

export default function createReactProps(
    di: GetDep,
    routeManager: RouteManager,
    pageMap: PageMap
): RootComponentProps {
    const initialRoute: ?Route = routeManager.resolve();
    const NotFoundPage = pageMap.NotFoundPage;
    const page = pageMap[initialRoute ? initialRoute.page : 'NotFoundPage'] || NotFoundPage;

    return {
        page: di(page),
        changes: routeManager.changes.map((route: Route) =>
            di(pageMap[route.page] || NotFoundPage)
        )
    }
}
