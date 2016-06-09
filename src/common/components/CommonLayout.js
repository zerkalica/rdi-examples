/* @flow */
import type {
    CommonLayoutProps,
    Element
} from 'reactive-di-todomvc/common/i'
import {component} from 'reactive-di-observable/annotations'

import 'reactive-di-todomvc/common/styles/core.css'

type CommonLayoutDeps = CommonLayoutProps & {}
export default function CommonLayout({
    children
}: CommonLayoutDeps): Element {
    return (
        <div className="common-layout">
            {children}
        </div>
    )
}
component()(CommonLayout)
