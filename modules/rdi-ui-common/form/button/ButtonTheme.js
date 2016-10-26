// @flow
import {theme} from 'reactive-di/annotations'

export type ButtonType = 'primary' | 'secondary' | 'info' | 'warning'

@theme
export default class ButtonTheme {
    __css: mixed
    constructor() {
        this.__css = {
            base: {
                composes: ['btn']
            },
            primary: {
                composes: ['btn', 'btn-primary']
            },
            secondary: {
                composes: ['btn', 'btn-secondary']
            },
            info: {
                composes: ['btn', 'btn-info']
            },
            warning: {
                composes: ['btn', 'btn-warning']
            }
        }
    }

    getTheme(type?: ?ButtonType): string {
        return (this: Object)[type || 'base']
    }
}
