/* @flow */

import 'reactive-di-todomvc/assets/main.css'

import ReactDOM from 'react-dom'
import {createElement} from 'react'
import {
    createPureStateDi,
    defaultPlugins
} from 'reactive-di'
import {RootComponent, ReactPlugin} from 'reactive-di-react'
import {createBrowserRouterManager} from 'modern-router'

import config from 'reactive-di-todomvc/../conf/.configloaderrc'
import createState from 'reactive-di-todomvc/app/helpers/createState'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'

import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'

import createReactProps from 'reactive-di-todomvc/app/helpers/createReactProps'

import pageMap from 'reactive-di-todomvc/app/components/pageMap'

import type {AnyAnnotation} from 'reactive-di/i/annotationInterfaces'
import type {GetDep} from 'reactive-di/i/diInterfaces'

import appRdi from 'reactive-di-todomvc/app/rdi/appRdi'
import annotations from 'reactive-di-todomvc/common/annotations'

const {factory} = annotations

const routerManager = createBrowserRouterManager(window, config.routes || {})

const browserRdi: Array<AnyAnnotation> = appRdi.concat([
    factory(AbstractStorage, window.storage),
    factory(AbstractRouterManager, routerManager)
]);

const baseEnv = new BaseEnv({
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: 'default'
});

const di: GetDep = createPureStateDi(
    createState(baseEnv, config, window.todoMvcSettings || {}),
    browserRdi,
    defaultPlugins.concat([
        new ReactPlugin()
    ])
);

const node: Element = document.getElementById('app');

const props = createReactProps(
    di,
    routerManager.locationChanges,
    pageMap
)

ReactDOM.render(createElement(RootComponent, props), node)
