/* @flow */

import type {
    CommonLayoutProps,
    Element
} from 'reactive-di-todomvc/common/i'
import {component} from 'reactive-di-observable/annotations'
import CommonLayoutTheme, {CommonLayoutThemeVars} from './CommonLayoutTheme'

type CommonLayoutDeps = CommonLayoutProps & {
    theme: CommonLayoutTheme;
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
    CommonLayoutThemeVars,
    CommonLayoutTheme
])(CommonLayout)
