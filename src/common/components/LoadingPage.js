/* @flow */
import type {Element} from 'reactive-di-todomvc/common/i'
import {component} from 'reactive-di-observable/annotations'

export default function LoadingPage(): Element {
    return (
        <div className="page-loading">
            <h1>Loading...</h1>
        </div>
    )
}
component()(LoadingPage)
