// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoHeaderTheme {
    wrapper: string
    header: string
    __css: mixed
    constructor() {
        this.__css = {
            wrapper: {},
            header: {}
        }
    }
}
