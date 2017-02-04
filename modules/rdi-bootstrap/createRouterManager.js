// @flow
import {
    AbstractLocation,
    RouterManager,
    SusaninRouter,
    Route,
    RouterConfig
} from 'modern-router'
// import type {ISource} from 'reactive-di'
import {setterKey} from 'reactive-di'
import {actions, hooks, source} from 'reactive-di/annotations'

source({key: 'Route'})(Route)
source({key: 'RouterConfig', construct: true})(RouterConfig)
source({key: 'AbstractLocation', instance: true})(AbstractLocation)

@actions
class RouteSetAction {
    src: ?ISource<Route> = null

    setRoute(nr: Route) {
        if (!this.src) {
            throw new Error('Init src')
        }
        this.src.set(nr)
    }
}

@hooks(Route)
class RouteHook {
    _rm: RouterManager
    _unsubscribe: ?() => void
    _setter: RouteSetAction

    constructor(rm: RouterManager, setter: RouteSetAction) {
        this._rm = rm
        this._unsubscribe = null
        this._setter = setter
    }

    willMount(route: Route) {
        this._setter.src = route[setterKey]
        this._unsubscribe = this._rm.onChange(this._setter.setRoute)
    }

    willUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe()
            this._unsubscribe = null
        }
    }
}

export default function createRouterManager(
    config: RouterConfig,
    loc: AbstractLocation
): RouterManager {
    return new RouterManager(
        loc,
        new SusaninRouter(config, loc.getParams())
    )
}
