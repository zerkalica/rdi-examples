// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class AlertLinkTheme {
    link: string

    __css: mixed

    constructor() {
        this.__css = {
            link: {
                composes: ['btn', 'btn-link']
            }
        }
    }
}
