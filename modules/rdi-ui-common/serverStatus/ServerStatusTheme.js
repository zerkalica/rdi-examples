// @flow

import {theme} from 'reactive-di/annotations'

import type {AlertType} from 'rdi-ui-common/alert/AlertTheme'

@theme
export default class ServerStatusTheme {
    error: string
    success: string

    __css: mixed

    constructor() {
        const alert = {
            display: 'inline-block',
            border: '1px solid transparent',
            padding: '0.1em 0.5em'
        }
        this.__css = {
            error: {
                ...alert,
                composes: ['alert-danger']
            },
            success: {
                ...alert,
                composes: ['alert-success']
            },
            info: {
                ...alert,
                composes: ['alert-info']
            },
            warning: {
                ...alert,
                composes: ['alert-warning']
            }
        }
    }

    alertType(type?: ?AlertType) {
        return (this: Object)[type || 'error']
    }
}
