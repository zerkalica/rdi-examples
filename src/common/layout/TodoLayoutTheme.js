// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoLayoutTheme {
    content: string

    __css: mixed

    constructor() {
        this.__css = {
            content: {
                composes: ['container']
            }
        }
    }
}
