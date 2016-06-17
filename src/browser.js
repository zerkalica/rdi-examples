/* @flow */

import _ from 'babel-plugin-transform-metadata/_'
import 'reactive-di-todomvc/../assets/core.css'

import {
    appDeps,
    pages,
    ErrorPage
} from 'reactive-di-todomvc/common'

import type {
    CreateContainerManager,
    Container,
    ContainerManager
} from 'reactive-di'
import {
    createManagerFactory,
    defaultPlugins,
    createHotRelationUpdater
} from 'reactive-di'
import {value} from 'reactive-di/configurations'

import {
    SetterPlugin,
    ComputedPlugin,
    MetaPlugin,
    ObservablePlugin,
    ThemePlugin,
    ComponentPlugin
} from 'reactive-di-observable'

import {observable} from 'reactive-di-observable/configurations'

import {
    createReactWidget,
    createReactBrowserRenderer
} from 'reactive-di-react'

import {
    Route,
    RouterObserver
} from 'modern-router'
import {RouterManagerFactory, PageNotFoundError} from 'modern-router'
import {BrowserLocation} from 'modern-router/browser'
import type {RouterManager} from 'modern-router'

import {createBrowserResolution} from 'observable-helpers/browser'
import {Resolution} from 'observable-helpers'

import merge from 'node-config-loader/utils/merge'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'
import type {
    IsDebug
} from 'reactive-di-todomvc/common/i'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'

import jss from 'jss'

const config = merge(staticConfig, window.todoMvcConfig || {})
const routerManager = (new RouterManagerFactory(config.RouterConfig))
    .create(new BrowserLocation(window))

const createCm: CreateContainerManager = createManagerFactory(
    defaultPlugins.concat([
        new SetterPlugin(),
        new ComputedPlugin(),
        new MetaPlugin(),
        new ObservablePlugin(),
        new ThemePlugin((styles) => jss.createStyleSheet(styles)),
        new ComponentPlugin(createReactWidget)
    ]),
    createHotRelationUpdater
)

const cm: ContainerManager = createCm(appDeps.concat([
    [(_: IsDebug), value(true)],
    [AbstractStorage, value(new BrowserLocalStorage(window.localStorage))],
    [(_: RouterManager), value(routerManager)],
    [BaseEnv, value(
        new BaseEnv(
            document.referrer,
            navigator.userAgent,
            navigator.language
        )
    )],
    [Resolution, observable({value: createBrowserResolution(window)})],
    [Route, observable({value: routerManager.route})]
]))

const data: [string, mixed][] = config.stores
//  || [
//     ['Session', {isAuthorized: false}]
// ]
const container: Container = cm.createContainer(null, data)

const observer = new RouterObserver(
    createReactBrowserRenderer(
        container,
        document.getElementById('app')
    ),
    pages,
    ErrorPage
)

const route: Route = routerManager.route
if (!route) {
    observer.error(new PageNotFoundError())
} else {
    Observable.from(route).subscribe(observer)
    observer.next(route)
}
