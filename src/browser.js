/* @flow */

import 'reactive-di-todomvc/assets/main.css'

import ReactDOM from 'react-dom'
import {createElement} from 'react'

import merge from 'node-config-loader/utils/merge'

import {
    createManagerFactory,
    defaultPlugins,
    createHotRelationUpdater
} from 'reactive-di'

import {value} from 'reactive-di/configurations'

import type {
    Container,
    ContainerManager,
    CreateContainerManager
} from 'reactive-di/i/coreInterfaces'

import {observablePlugins} from 'reactive-di-observable'

import {
    createPageGetter,
    ReactPlugin
} from 'reactive-di-react'

import type {Widget} from 'reactive-di-react/i/interfaces'

import {createBrowserRouterManager} from 'modern-router'

import type {
    Route,
    RouterManager
} from 'modern-router/i/routerInterfaces'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'

import {pages, ErrorPage} from 'reactive-di-todomvc/app/pageMap'
import appRdi from 'reactive-di-todomvc/app/appRdi'

const createContainerManager: CreateContainerManager = createManagerFactory(
    defaultPlugins.concat([ReactPlugin], observablePlugins),
    createHotRelationUpdater
);

const config = merge(staticConfig, window.todoMvcConfig || {})

const routerManager: RouterManager = createBrowserRouterManager(window, config.RouterConfig);

const baseQuery = new BaseQuery(routerManager.resolve());

const appCm: ContainerManager = createContainerManager(appRdi.concat([
    value(AbstractStorage, new BrowserLocalStorage(window.localStorage)),
    value(AbstractRouterManager, routerManager),
    value(BaseEnv, new BaseEnv({
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: 'default'
    })),
    value(BaseQuery, baseQuery)
]));

const appDi: Container = appCm.createContainer();

const node: Element = document.getElementById('app');

function getWidget(widget: Widget, error: ?Error): React$Element {
    return createElement(appDi.get(widget), {error})
}

const getPage = createPageGetter(getWidget, pages, ErrorPage);

const observer = {
    next(route: Route): void {
        ReactDOM.render(getPage(route.page), node)
    },
    error(err: Error): void {
        throw err
    },
    complete(): void {}
};

routerManager.changes.subscribe(observer)
observer.next(baseQuery)
