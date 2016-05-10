/* @flow */

import type {Element} from 'reactive-di-react/i/interfaces'
import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

type TodoPageLoadingStateProps = {
    tr: Tr;
    meta: TodoPageLoadingStateMeta;
}

export default function TodoPageLoadingState({
    meta,
    tr
}: TodoPageLoadingStateProps): Element {
    return (
        <div className="TodoPageLoadingState">
            {meta.pending ?
                <div className="todoloader">
                    <h3>{tr('Pending...')}</h3>
                </div>
            : null}
            {meta.error ?
                <div className="todoerror">
                    {meta.error.message || tr('Unknown error')}
                </div>
            : null}
        </div>
    )
}
