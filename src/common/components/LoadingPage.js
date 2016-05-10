/* @flow */
import {component} from 'reactive-di-react/annotations'

import type {Element} from 'reactive-di-react/i/interfaces'

export default function LoadingPage(): Element {
    return (
        <div className="page-loading">
            <h1>Loading...</h1>
        </div>
    )
}
component(LoadingPage)
