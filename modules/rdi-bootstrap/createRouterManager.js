// @flow
import {
    AbstractLocation,
    RouterManager,
    SusaninRouter,
    Route,
    RouterConfig
} from 'modern-router'
import type {ISource} from 'reactive-di'
import {getSrc} from 'reactive-di'
import {actions, hooks, source} from 'reactive-di/annotations'

source({key: 'Route'})(Route)
source({key: 'RouterConfig', construct: true})(RouterConfig)
source({key: 'AbstractLocation', instance: true})(AbstractLocation)

@actions
class RouteSetAction {
    src: ?ISource<Route> = null
    isChangedByHistory: boolean = false

    locationChange(nr: Route) {
        if (!this.src) {
            throw new Error('Init src')
        }
        this.isChangedByHistory = true
        this.src.set(nr)
    }
}

@hooks(Route)
export class RouteHook {
    _rm: RouterManager
    _unsubscribe: ?() => void
    _setter: RouteSetAction

    constructor(rm: RouterManager, setter: RouteSetAction) {
        this._rm = rm
        this._unsubscribe = null
        this._setter = setter
    }

    willMount(route: Route) {
        const setter = this._setter
        setter.src = getSrc(route)
        this._unsubscribe = this._rm.onChange(setter.locationChange)
        setter.isChangedByHistory = false
    }

    willUpdate(next: Route) {
        if (this._setter.isChangedByHistory) {
            this._setter.isChangedByHistory = false
        } else {
            this._rm.set(next.name, next.query)
        }
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
