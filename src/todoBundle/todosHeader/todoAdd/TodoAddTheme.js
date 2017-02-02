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
                composes: ['input-group-addon', 'btn', 'btn-link'],
                fontWeight: 'bold'
            },
            togleAllIcon: {
                composes: ['fa', 'fa-angle-down']
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
