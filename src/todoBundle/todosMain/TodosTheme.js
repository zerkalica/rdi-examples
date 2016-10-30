// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodosTheme {
    wrapper: string
    item: string
    __css: mixed

    constructor() {
        this.__css = {
            wrapper: {
                margin: 0,
                padding: 0,
                listStyle: 'none'
            },
            item: {
                display: 'block',
                padding: '0.3em 0'
            }
        }
    }
}
