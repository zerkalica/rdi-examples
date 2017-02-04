// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class NavTheme {
    wrapper: string
    block: string
    active: string
    link: string
    content: string
    statusWrapper: string

    __css: mixed

    constructor() {
        this.__css = {
            statusWrapper: {
                composes: ['form-inline my-2']
            },
            content: {
                composes: ['navbar-collapse']
            },
            wrapper: {
                composes: ['navbar', 'navbar-toggleable-md', 'navbar-light', 'bg-faded']
            },
            block: {
                composes: ['navbar-nav', 'mr-auto']
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
