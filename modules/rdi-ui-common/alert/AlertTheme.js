// @flow

import {theme} from 'reactive-di/annotations'

export type AlertType = 'success' | 'error' | 'warning'

@theme
export default class AlertTheme {
    error: string
    success: string

    __css: mixed

    constructor() {
        this.__css = {
            error: {
                composes: ['alert', 'alert-error']
            },
            success: {
                composes: ['alert', 'alert-sucess']
            },
            warning: {
                composes: ['alert', 'alert-warning']
            }
        }
    }

    alertType(type?: ?AlertType) {
        return (this: Object)[type || 'error']
    }
}
