/* @flow */

import {
    observable,
    theme
} from 'reactive-di-observable/annotations'

import type {
    ParseStyle
} from 'reactive-di-observable'

@observable('CommonLayoutThemeVars')
export class CommonLayoutThemeVars {
    color: number;

    constructor(rec?: {
        color?: number;
    } = {}) {
        this.color = rec.color || 20
    }
}

@theme()
export default class CommonLayoutTheme {
    container: string;
    __css: mixed;

    constructor(csjs: ParseStyle, {color}: CommonLayoutThemeVars) {
        this.__css = csjs`
            .container {
                border: 5px solid rgb(${color}, 0, 0);
            }
        `
    }
}
