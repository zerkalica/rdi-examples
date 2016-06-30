/* @flow */

import type {
    Element
} from 'reactive-di-todomvc/common/i'

export default function FallbackPage({
    error
}: {error: Error}): Element {
    return (
        <div className="unhandlered-error-page">
            <h1>Page error</h1>
            <pre>{error.message}</pre>
            <pre className="error-trace">{error.stack}</pre>
        </div>
    )
}
