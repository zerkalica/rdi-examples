/* @flow */

import type {GetDep} from 'reactive-di/i/diInterfaces'

import type {
    RootComponentProps
} from 'reactive-di-react/i/interfaces'
import type {Route} from 'modern-router/i/routerInterfaces'

import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

export default function createReactProps(
    di: GetDep,
    locationChanges: Observable<Route, void>,
    pageMap: PageMap
): RootComponentProps {
    return {
        page: di(pageMap.DefaultPage),
        observable: locationChanges.map((route: Route) =>
            di(pageMap[route.page] || pageMap.NotFoundPage)
        )
    }
}
