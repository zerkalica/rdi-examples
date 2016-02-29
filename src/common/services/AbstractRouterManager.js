/* @flow */

import type {
    Route,
    Redirector,
    Router,
    RouterLocation,
    RouterManager // eslint-disable-line
} from 'modern-router/i/routerInterfaces'

// implements RouterManager
export default class AbstractRouterManager {
    locationChanges: Observable<?Route, Error>;
    redirector: Redirector;
    router: Router;
    location: RouterLocation;
}
