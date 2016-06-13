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

import type {
    ParseStyle
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
import {
    createBrowserRouterManager
} from 'modern-router/browser'
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

import {createCssReplace} from 'css-replace'

import getCss from 'csjs/get-css'
import csjs from 'csjs'

const config = merge(staticConfig, window.todoMvcConfig || {})
const routerManager = createBrowserRouterManager(window, config.RouterConfig)

const createCm: CreateContainerManager = createManagerFactory(
    defaultPlugins.concat([
        new SetterPlugin(),
        new ComputedPlugin(),
        new MetaPlugin(),
        new ObservablePlugin(),
        new ThemePlugin(createCssReplace(document, getCss)),
        new ComponentPlugin(createReactWidget)
    ]),
    createHotRelationUpdater
)

const cm: ContainerManager = createCm(appDeps.concat([
    [(_: ParseStyle), value(csjs)],
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
Observable.from(route).subscribe(observer)
observer.next(route)
