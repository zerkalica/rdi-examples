/* @flow */

import type {Tr} from 'any-translate'
import type {
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'

import instanceMap from 'reactive-di-todomvc/common/helpers/instanceMap'
import QueryError from 'reactive-di-todomvc/common/errors/QueryError'
import {PageNotFoundError} from 'modern-router'

type Props = {
    error: Error;
}
type ErrorPageProps = Props & {
    tr: Tr;
}

export type IErrorPage = FlowFix<Props>;

export default function ErrorPage({
    tr,
    error
}: ErrorPageProps): Element {
    return (
        <div className="unhandlered-error-page">
            <h1>{tr('Page error')}</h1>
            {instanceMap(error, [
                [QueryError, tr('Error in query params')],
                [PageNotFoundError, tr('Page not found: #{pageName}', {
                    pageName: error.pageName || 'null'
                })],
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
