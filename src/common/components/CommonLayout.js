/* @flow */


import _ from 'babel-plugin-transform-metadata/_'
import type {
    CommonLayoutProps,
    Element
} from 'reactive-di-todomvc/common/i'
import {component} from 'reactive-di-observable/annotations'
import {value} from 'reactive-di/configurations'
import CommonLayoutTheme from './CommonLayoutTheme.css'

export type ICommonLayoutTheme = {
    container: string;
}

type CommonLayoutDeps = CommonLayoutProps & {
    theme: ICommonLayoutTheme;
}

export default function CommonLayout({
    children,
    theme
}: CommonLayoutDeps): Element {
    return (
        <div className={theme.container}>
            {children}
        </div>
    )
}
component([
    [(_: ICommonLayoutTheme), value(CommonLayoutTheme)]
])(CommonLayout)
