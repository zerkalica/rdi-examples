/* @flow */
import React from 'react'
import instanceMap from 'reactive-di-todomvc/common/helpers/instanceMap'

import QueryError from 'reactive-di-todomvc/common/errors/QueryError'
import PageNotFoundError from 'reactive-di-todomvc/common/errors/PageNotFoundError'

import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'

type ErrorPageProps = {
    error: Error;
    tr: Tr;
}

export default function ErrorPage({
    tr,
    error
}: ErrorPageProps): Element {
    return (
        <div className="unhandlered-error-page">
            <h1>Page error</h1>
            {instanceMap(error, [
                [QueryError, tr('Error in query params')],
                [PageNotFoundError, tr('Page not found: #{pageName}', error)],
                [null, tr('Unknown error')]
            ])}
            {process.env.NODE_ENV === 'development'
                ? <div className="debug-message-error">
                    {error.message}
                </div>
                : null
            }
        </div>
    )
}