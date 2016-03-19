/* @flow */

import 'reactive-di-todomvc/assets/main.css'

import ReactDOM from 'react-dom'
import {createElement} from 'react'
import {
    createPureStateDi,
    defaultPlugins
} from 'reactive-di'
import {ReactPlugin} from 'reactive-di-react'
import {createBrowserRouterManager} from 'modern-router'

import config from 'reactive-di-todomvc/../conf/.configloaderrc'
import createState from 'reactive-di-todomvc/app/helpers/createState'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'

import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'

import {pages, ErrorPage} from 'reactive-di-todomvc/app/components/pageMap'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'
import type {GetDep} from 'reactive-di/i/diInterfaces'

import appRdi from 'reactive-di-todomvc/app/rdi/appRdi'

import {factory, alias} from 'reactive-di/dist/annotations'
import type {
    Route,
    RouterManager
} from 'modern-router/i/routerInterfaces'
import {createPageGetter} from 'reactive-di-react'
import type {Widget} from 'reactive-di-react/i/interfaces'

const routerManager: RouterManager = createBrowserRouterManager(window, config.config.router || {});

const browserRdi: Array<Annotation> = appRdi.concat([
    alias(AbstractStorage, factory(() => new BrowserLocalStorage(window.localStorage))),
    alias(AbstractRouterManager, factory(() => routerManager))
]);

const di: GetDep = createPureStateDi(
    createState(
        new BaseEnv({
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: 'default'
        }),
        new BaseQuery(routerManager.resolve()),
        config,
        window.todoMvcSettings || {}
    ),
    browserRdi,
    defaultPlugins.concat([
        new ReactPlugin()
    ])
);

const node: Element = document.getElementById('app');

function getWidget(widget: Widget, error: ?Error): React$Element {
    return createElement(di(widget), {error})
}

const getPage = createPageGetter(getWidget, pages, ErrorPage);

function next(route: Route): void {
    ReactDOM.render(getPage(route.page), node)
}

routerManager.changes.subscribe({
    next
})
next(routerManager.resolve())
