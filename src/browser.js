/* @flow */

import type {Container} from 'reactive-di/i/coreInterfaces'
import type {RouterManager} from 'modern-router/i/routerInterfaces'

import 'reactive-di-todomvc/assets/main.css'

import merge from 'node-config-loader/utils/merge'
import {observable} from 'reactive-di-observable/configurations'
import {createReactBrowserRenderer} from 'reactive-di-react'

import {
    RouterObserver,
    createBrowserRouterManager
} from 'modern-router'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'
import BaseQueryLoader from 'reactive-di-todomvc/common/loaders/BaseQueryLoader'

import {
    pages,
    ErrorPage
} from 'reactive-di-todomvc/app/pageMap'
import createContainer from 'reactive-di-todomvc/app/createContainer'

const config = merge(staticConfig, window.todoMvcConfig || {})
const routerManager: RouterManager = createBrowserRouterManager(window, config.RouterConfig);
const baseQuery = new BaseQuery(routerManager.resolve());

const container: Container = createContainer([
    observable(AbstractStorage, {value: new BrowserLocalStorage(window.localStorage)}),
    observable(AbstractRouterManager, {value: routerManager}),
    observable(BaseEnv, {
        value: new BaseEnv({
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: 'default'
        })
    }),
    observable(BaseQuery, {
        value: baseQuery,
        loader: BaseQueryLoader
    })
]);

const observer: Observer = new RouterObserver(
    createReactBrowserRenderer(
        container,
        document.getElementById('app')
    ),
    pages,
    ErrorPage
);

routerManager.changes.subscribe(observer)

observer.next(baseQuery)
