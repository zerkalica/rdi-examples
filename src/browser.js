/* @flow */

import _ from 'babel-plugin-transform-metadata/_'
import 'reactive-di-todomvc/../assets/core.css'

import merge from 'node-config-loader/utils/merge'

import type {Container} from 'reactive-di'

import createReactBrowserRenderer from 'reactive-di-react/browser'

import {AbstractLocation} from 'modern-router'
import {BrowserLocation} from 'modern-router/browser'

import {Resolution} from 'observable-helpers'
import {createBrowserResolution} from 'observable-helpers/browser'

import staticConfig from 'reactive-di-todomvc/../conf/.configloaderrc'

import Bootstrap from 'reactive-di-todomvc/bootstrap'
import type {Config} from 'reactive-di-todomvc/bootstrap'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'

function createBrowserApp(config: Config): void {
    const bootstrap = new Bootstrap(config)
    bootstrap.start(
        new BrowserLocation(window),
        (container: Container) => createReactBrowserRenderer(container, window.document.getElementById('app')),
        [
            [BaseEnv, new BaseEnv(
                window.document.referrer,
                window.navigator.userAgent,
                window.navigator.language
            )],
            [Resolution, createBrowserResolution(window)],
            [AbstractStorage, new BrowserLocalStorage(window.localStorage)]
        ]
    )
}

createBrowserApp((merge(staticConfig, window.todoMvcConfig || {}): Config))
