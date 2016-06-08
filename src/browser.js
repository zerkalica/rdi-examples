/* @flow */

import 'reactive-di-todomvc/assets/main.css'

import _ from 'babel-plugin-transform-metadata/_'

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
    observablePlugins,
    createComponentPlugin
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
import Resolution from 'observable-helpers/Resolution'

import merge from 'node-config-loader/utils/merge'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'
import type {
    IsDebug
} from 'reactive-di-todomvc/common/i'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'

import {
    appDeps,
    pages,
    ErrorPage
} from 'reactive-di-todomvc/common'

const config = merge(staticConfig, window.todoMvcConfig || {})
const routerManager = createBrowserRouterManager(window, config.RouterConfig)
const route: Route = routerManager.resolve()

const createCm: CreateContainerManager = createManagerFactory(
    defaultPlugins.concat([createComponentPlugin(createReactWidget)], observablePlugins),
    createHotRelationUpdater
)

const cm: ContainerManager = createCm(appDeps.concat([
    value((_: IsDebug), true),
    value(AbstractStorage, new BrowserLocalStorage(window.localStorage)),
    value((_: RouterManager), routerManager),
    value(BaseEnv, new BaseEnv({
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language
    })),
    observable(Resolution, createBrowserResolution(window)),
    observable(Route, {
        value: route,
        observable: routerManager.changes
    })
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

routerManager.changes.subscribe(observer)

observer.next(route)
