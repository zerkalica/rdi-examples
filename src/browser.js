/* @flow */
/* eslint-env browser */
import 'rdi-todo/wpFixes'

import {merge} from 'node-config-loader/common'
import browserInit from 'rdi-bootstrap/browser'

import {ErrorPage, FallbackPage} from 'rdi-ui-common'
// import staticConfig from 'rdi-config/.configloaderrc'
import {rdi, pages, routes} from './modules'

const values = merge([
    {
        RouterConfig: {
            isFull: false,
            routes
        }
    },
    // staticConfig,
    window['rdi-todo'] || {}
])

browserInit({
    window,
    ErrorPage,
    FallbackPage,
    elementId: 'app',
    values,
    rdi,
    pages
})()
