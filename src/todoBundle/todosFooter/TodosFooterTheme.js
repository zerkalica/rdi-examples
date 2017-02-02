// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodosFooterTheme {
    list: string
    listItem: string
    todoCount: string
    footer: string
    clearCompleted: string
    normalLink: string
    activeLink: string

    __css: mixed

    constructor() {
        this.__css = {
            footer: {
                padding: '0.3em 0',
                textAlign: 'center'
            },
            todoCount: {
                padding: '0.5rem 1rem',
                vertcalAlign: 'middle',
                display: 'inline-block',
                float: 'left',
                textAlign: 'left'
            },
            list: {
                padding: 0,
                listStyle: 'none',
                position: 'absolute',
                right: 0,
                left: 0
            },
            listItem: {
                display: 'inline'
            },
            activeLink: {
                composes: ['btn', 'btn-primary']
            },
            normalLink: {
                composes: ['btn', 'btn-link']
            },
            clearCompleted: {
                composes: ['btn', 'btn-secondary'],
                float: 'right',
                position: 'relative'
            }
        }
    }

    link(isActive: boolean): string {
        return isActive
            ? this.activeLink
            : this.normalLink
    }
}
