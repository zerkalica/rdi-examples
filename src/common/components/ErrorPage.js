/* @flow */

import type {Tr} from 'any-translate'
import type {
    IsDebug,
    ErrorPageProps,
    Element
} from 'reactive-di-todomvc/common/i'

import instanceMap from 'reactive-di-todomvc/common/helpers/instanceMap'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'
import {PageNotFoundError} from 'modern-router'

type ErrorPageOpts = ErrorPageProps & {
    isDebug: IsDebug;
    t: Tr;
}

export default function ErrorPage({
    t,
    isDebug,
    error
}: ErrorPageOpts): Element {
    if (isDebug && error) {
        console.error(error)
    }
    return (
        <div className="unhandlered-error-page">
            <h1>{t('Page error')}</h1>
            {instanceMap(error, [
                [QueryError, t('Error in query params')],
                [PageNotFoundError, t('Page not found: #{pageName}', {
                    pageName: error.pageName || 'null'
                })],
                [null, t('Unknown error')]
            ])}
            {isDebug
                ? <div className="debug-message-error">
                    <pre className="error-trace">{error.stack}</pre>
                </div>
                : null
            }
        </div>
    )
}
