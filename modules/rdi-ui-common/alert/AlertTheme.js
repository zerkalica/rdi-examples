// @flow

import {theme} from 'reactive-di/annotations'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

@theme
export default class AlertTheme {
    error: string
    success: string

    __css: mixed

    constructor() {
        const alert = {
            marginTop: '0.5em'
        }
        this.__css = {
            error: {
                ...alert,
                composes: ['alert', 'alert-danger']
            },
            success: {
                ...alert,
                composes: ['alert', 'alert-success']
            },
            info: {
                ...alert,
                composes: ['alert', 'alert-info']
            },
            warning: {
                ...alert,
                composes: ['alert', 'alert-warning']
            }
        }
    }

    alertType(type?: ?AlertType) {
        return (this: Object)[type || 'error']
    }
}
