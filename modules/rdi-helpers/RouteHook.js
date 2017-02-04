// @flow
import {RouterManager, Route} from 'modern-router'
import {setterKey} from 'reactive-di'

export type IRouteParams = {
    page?: ?string;
    params: Object;
}

export default class RouteHook<T: Object> {
    _rm: RouterManager
    _unsubscribe: ?() => void

    constructor(rm: RouterManager) {
        this._rm = rm
    }

    _fromRoute(_r: Route): ?$Shape<T> {
        throw new Error('implement')
    }

    _toRoute(_next: T): IRouteParams {
        throw new Error('implement')
    }

    _onRoute(params: T, nr: Route) {
        const newParams = this._fromRoute(nr)
        if (newParams) {
            params.set(newParams)
            params[setterKey].context.notifier.end()
        }
    }

    willMount(params: T) {
        this._unsubscribe = this._rm.onChange((nr: Route) => this._onRoute(params, nr))
    }

    willUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe()
        }
    }

    willUpdate(next: T) {
        const {page, params} = this._toRoute(next)
        this._rm.update(page || null, params)
    }
}
