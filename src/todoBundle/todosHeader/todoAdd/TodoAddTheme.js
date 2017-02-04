// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoAddTheme {
    error: string
    ctl: string
    submit: string
    group: string
    addIcon: string
    toggleAll: string
    togleAllIcon: string

    __css: mixed

    constructor() {
        this.__css = {
            group: {
                composes: ['input-group']
            },
            ctl: {
                composes: ['form-control']
            },
            toggleAll: {
                composes: ['input-group-addon', 'btn'],
                fontWeight: 'bold'
            },
            togleAllIcon: {
                composes: ['fa', 'fa-angle-down']
            },
            submit: {
                composes: ['btn', 'btn-success']
            },
            addIcon: {
                composes: ['fa', 'fa-plus-square']
            }
        }
    }
}
