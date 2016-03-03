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

import type {Annotation} from 'reactive-di/i/annotationInterfaces'
import type {GetDep} from 'reactive-di/i/diInterfaces'

import appRdi from 'reactive-di-todomvc/app/rdi/appRdi'

import {factory, alias} from 'reactive-di/dist/annotations'

const routerManager = createBrowserRouterManager(window, config.routes || {})

class LocalStorage extends AbstractStorage {
    _storage: Storage;
    constructor(storage: Storage) {
        super()
        this._storage = storage
    }

    hasItem(key: string): void {
        return this._storage.getItem(key)
    }

    getItem<V>(key: string): V {
        const value: ?string = this._storage.getItem(key);
        if () {

        }
        return JSON.parse( || '')
    }

    setItem<V>(key: string, value: V): void {
        this._storage.setItem(key, JSON.stringify(value))
    }

    removeItem(key: string): void {
        this._storage.removeItem(key)
    }

    clear(): void {
        this._storage.clear()
    }
}

const browserRdi: Array<Annotation> = appRdi.concat([
    alias(AbstractStorage, factory(() => window.localStorage)),
    alias(AbstractRouterManager, factory(() => routerManager))
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

ReactDOM.render(createElement(di(RootComponent), props), node)
