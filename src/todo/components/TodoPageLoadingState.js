/* @flow */
import {component} from 'reactive-di-observable/annotations'

import type {
    Element
} from 'reactive-di-todomvc/common/i'
import type {Tr} from 'any-translate'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

type TodoPageLoadingStateProps = {
    t: Tr;
    meta: TodoPageLoadingStateMeta;
}

export default function TodoPageLoadingState({
    meta,
    t
}: TodoPageLoadingStateProps): Element {
    return (
        <div className="TodoPageLoadingState">
            {meta.pending ?
                <div className="todoloader">
                    <h3>{t('Pending...')}</h3>
                </div>
            : null}
            {meta.error ?
                <div className="todoerror">
                    {meta.error.message || t('Unknown error')}
                </div>
            : null}
        </div>
    )
}
component()(TodoPageLoadingState)
