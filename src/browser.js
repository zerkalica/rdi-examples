/* @flow */

import _ from 'babel-plugin-transform-metadata/_'
import 'reactive-di-todomvc/../assets/core.css'

import merge from 'node-config-loader/utils/merge'

import type {Container} from 'reactive-di'

import createReactBrowserRenderer from 'reactive-di-react/browser'

import type {RouterManager, AbstractLocation} from 'modern-router'
import {Route} from 'modern-router'
import {
    createBrowserRenderer,
    BrowserLocation
} from 'modern-router/browser'

import {Resolution, mapObservable} from 'observable-helpers'
import {createBrowserResolution} from 'observable-helpers/browser'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'

import {bootstrap, pages} from 'reactive-di-todomvc/bootstrap'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'

const config: {[id: string]: mixed} = merge(staticConfig, window.todoMvcConfig || {})
const createContainer: (val: [mixed, mixed][]) => Container = bootstrap(config)

const container: Container = createContainer([
    [(_: AbstractLocation), new BrowserLocation(window)],
    [BaseEnv, new BaseEnv(
        window.document.referrer,
        window.navigator.userAgent,
        window.navigator.language
    )],
    [Resolution, createBrowserResolution(window)],
    [AbstractStorage, new BrowserLocalStorage(window.localStorage)]
])

const render: (pageId: ?string) => void = createBrowserRenderer(
    pages,
    (widget) => container.get(widget),
    createReactBrowserRenderer(window.document.getElementById('app'))
)

const rm: RouterManager = container.get((_: RouterManager))
Observable.from(rm.route).subscribe({
    next(route: Route): void {
        render(route.page)
    }
})
render(rm.route.page)
