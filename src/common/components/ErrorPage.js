/* @flow */

import type {Tr} from 'any-translate'
import type {
    ErrorPageProps,
    Element
} from 'reactive-di-todomvc/common/i'

import DebugConfig from 'reactive-di-todomvc/common/models/DebugConfig'
import instanceMap from 'reactive-di-todomvc/common/helpers/instanceMap'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'
import {PageNotFoundError} from 'modern-router'

import {component} from 'reactive-di-observable/annotations'

type ErrorPageOpts = ErrorPageProps & {
    debug: DebugConfig;
    t: Tr;
}

export default function ErrorPage({
    t,
    debug,
    error
}: ErrorPageOpts): Element {
    if (debug.isEnabled && error) {
        console.error(error) // eslint-disable-line
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
            {debug.isEnabled
                ? <div className="debug-message-error">
                    <pre className="error-trace">{error.stack}</pre>
                </div>
                : null
            }
        </div>
    )
}
component()(ErrorPage)
