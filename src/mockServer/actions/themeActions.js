/* @flow */
import {setter} from 'reactive-di-observable/annotations'

import type {
    Operation
} from 'reactive-di-observable'

import {CommonLayoutThemeVars} from 'reactive-di-todomvc/common/components/CommonLayoutTheme'

export type IChangeLayoutColor = (color: string) => void;

export function changeLayoutColor(
    commonLayoutThemeVars: CommonLayoutThemeVars,
    /* @args */ value: string
): Array<Operation> {
    return [
        {object: new CommonLayoutThemeVars({color: Number(value)})}
    ]
}
setter()(changeLayoutColor)
