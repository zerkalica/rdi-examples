// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoAddTheme {
    error: string
    ctl: string
    submit: string
    group: string
    addIcon: string

    __css: mixed
    constructor() {
        this.__css = {
            group: {
                composes: ['input-group']
            },
            ctl: {
                composes: ['form-control']
            },
            submit: {
                composes: ['btn', 'btn-success']
            },
            error: {
                width: '100%'
            },
            addIcon: {
                composes: ['fa', 'fa-plus-square']
            }
        }
    }
}
