/* @flow */
/* eslint-env browser */

import rtConfig from 'rdi-todo/wpFixes'

import {merge} from 'node-config-loader/common'
import browserInit from 'rdi-bootstrap/browser'

import {ErrorPage} from 'rdi-ui-common'
// import staticConfig from 'rdi-config/.configloaderrc'
import {rdi, pages, routes} from './modules'
import Logger from './common/logger/Logger'

const pn = document.location.pathname
const values = merge([
    {
        RouterConfig: {
            isFull: false,
            prefix: pn.substring(0, pn.length - 1),
            routes
        }
    },
    // staticConfig,
    rtConfig
])

browserInit({
    window,
    ErrorPage,
    elementId: 'app',
    values,
    pages,
    rdi,
    logger: Logger
})
