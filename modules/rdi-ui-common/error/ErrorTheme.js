// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class ErrorTheme {
    wrapper: string
    debug: string
    trace: string

    __css: mixed

    constructor() {
        this.__css = {
            wrapper: {
                border: '1px solid red'
            }
        }
    }
}
