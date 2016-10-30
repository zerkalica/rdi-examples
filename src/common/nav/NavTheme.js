// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class NavTheme {
    wrapper: string
    block: string
    active: string
    link: string
    statusWrapper: string

    __css: mixed

    constructor() {
        this.__css = {
            statusWrapper: {
                composes: ['float-xs-right']
            },
            wrapper: {
                composes: ['navbar', 'navbar-light', 'bg-faded']
            },
            block: {
                composes: ['nav', 'navbar-nav']
            },
            active: {
                composes: ['nav-item', 'active']
            },
            link: {
                composes: ['nav-link']
            }
        }
    }
}
