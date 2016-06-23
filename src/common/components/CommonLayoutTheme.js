/* @flow */

import {
    observable,
    theme
} from 'reactive-di-observable/annotations'

import css from 'jss-css/lib/css'

@observable({key: 'CommonLayoutThemeVars'})
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

    constructor({color}: CommonLayoutThemeVars) {
        this.__css = css`
            .container {
                border: 5px solid rgb(${color}, 0, 0);
            }
        `
    }
}
