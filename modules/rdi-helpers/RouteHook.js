// @flow
import {setter} from 'reactive-di'
import {RouterManager, Route} from 'modern-router'

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

    fromRoute(_r: Route): ?$Shape<T> {
        throw new Error('implement')
    }

    toRoute(_next: T): IRouteParams {
        throw new Error('implement')
    }

    willMount(params: T) {
        this._unsubscribe = this._rm.onChange((nr: Route) => {
            const newParams = this.fromRoute(nr)
            if (newParams) {
                setter(params, newParams)
            }
        })
    }

    willUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe()
        }
    }

    willUpdate(next: T) {
        const {page, params} = this.toRoute(next)
        this._rm.update(page || null, params)
    }
}
