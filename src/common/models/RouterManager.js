/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import type {
    Route,
    Redirector,
    Router,
    RouterLocation,
    RouterManager // eslint-disable-line
} from 'modern-router/i/routerInterfaces'

// implements RouterManager
export default class RouterManagerImpl {
    locationChanges: Observable<?Route, void>;
    redirector: Redirector;
    router: Router;
    location: RouterLocation;

    constructor(rec: RouterManager) {
        this.locationChanges = rec.locationChanges
        this.redirector = rec.redirector
        this.router = rec.router
        this.location = rec.location
    }
}

export default rdi.model(RouterManagerImpl)
