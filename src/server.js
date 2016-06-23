/* @flow */
/* eslint-env node */
/* eslint-disable no-console */

import _ from 'babel-plugin-transform-metadata/_'

import http from 'http'
import type {IncomingMessage, Server} from 'http'
import {LocalStorage} from 'node-localstorage'
import os from 'os'
import path from 'path'
import loader from 'node-config-loader'

import {createElement} from 'react'
import ReactDOMServer from 'react-dom/server'

import type {ServerResponse} from 'modern-router/i/fixes'
import {RawHttpServerLocation} from 'modern-router/server'

import {Resolution} from 'observable-helpers'

import type {Container} from 'reactive-di'

import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import Bootstrap from 'reactive-di-todomvc/bootstrap'
import type {Config} from 'reactive-di-todomvc/bootstrap'
import BrowserLocalStorage from 'reactive-di-todomvc/common/helpers/browser/BrowserLocalStorage'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'

const localStorage = new LocalStorage(
    path.resolve(__dirname, '..', 'dist', 'local-storage.json')
)

export default function createReactServerRenderer<TargetElement: Function, Widget: Function>(
    di: Container,
    req: IncomingMessage,
    res: ServerResponse
): Renderer {
    return function renderReactiveReactWidget(widget: Widget, error: ?Error): void {
        const provider = di.getProvider(widget)
        if (provider.getLoadingState) {
            provider.getLoadingState()
                .then(([state, widget]) => {
                    const body = ReactDOMServer.renderToString(createElement(widget, {error}))
                    res.statusCode = (error ? (error.statusCode || null) : null) || 200
                    res.write(body)
                    res.end()
                })
                .catch((err: Error) => {
                    res.statusCode = err.statusCode || 500
                    res.write(err.message)
                    res.end()
                })
        }
    }
}

function createServerApp(config: Config): void {
    const bootstrap = new Bootstrap(config)

    function createContainer(req: IncomingMessage, res: ServerResponse): void {
        const headers = req.headers

        bootstrap.start(
            new RawHttpServerLocation(req, res),
            (container: Container) => createReactServerRenderer(container, req, res),
            (config.stores || []).concat([
                [BaseEnv, new BaseEnv(
                    headers.referrer,
                    headers.userAgent,
                    headers.language
                )],
                [Resolution, new Resolution(1024, 768)],
                [AbstractStorage, new BrowserLocalStorage(localStorage)]
            ])
        )
    }

    const server: Server = http.createServer(createContainer)
    server.listen(8080)
    server.on('error', (err: Error) => {
        console.error(err.stack)
    })
}

const confPromise: Promise<Config> = loader({
    mask: [__dirname + '/../conf/app/**/*.{json,yml,tml}'],
    instance: 'server',
    env: process.env.NODE_ENV,
    hostname: os.hostname(),
    tagSeparator: '#'
})

confPromise
    .then(createServerApp)
    .catch((err: Error) => console.error(err.message))
