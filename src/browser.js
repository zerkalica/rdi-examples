/* @flow */

import _ from 'babel-plugin-transform-metadata/_'

import type {Container} from 'reactive-di'
import type {RouterManager} from 'modern-router'
import type {
    IsDebug
} from 'reactive-di-todomvc/common'

import 'reactive-di-todomvc/assets/main.css'

import merge from 'node-config-loader/utils/merge'
import {value} from 'reactive-di/configurations'
import {observable} from 'reactive-di-observable/configurations'
import {createReactBrowserRenderer} from 'reactive-di-react'

import {
    Route,
    RouterObserver
} from 'modern-router'

import {
    createBrowserRouterManager
} from 'modern-router/browser'

import {createBrowserResolution} from 'observable-helpers/browser'
import Resolution from 'observable-helpers/Resolution'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'

import {
    pages,
    ErrorPage
} from 'reactive-di-todomvc/app/pageMap'

import createContainer from 'reactive-di-todomvc/app/createContainer'

const config = merge(staticConfig, window.todoMvcConfig || {})
const routerManager = createBrowserRouterManager(window, config.RouterConfig);
const route: Route = routerManager.resolve();

const container = createContainer([
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
]);

const observer = new RouterObserver(
    createReactBrowserRenderer(
        container,
        document.getElementById('app')
    ),
    pages,
    ErrorPage
);

routerManager.changes.subscribe(observer)

observer.next(route)
