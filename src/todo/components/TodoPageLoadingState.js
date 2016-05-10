/* @flow */
import {component} from 'reactive-di-react/annotations'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

import type {Tr} from 'reactive-di-todomvc/i/commonInterfaces'

type TodoPageLoadingStateState = {
    tr: Tr;
    meta: TodoPageLoadingStateMeta;
}

function TodoPageLoadingState({
    meta,
    tr
}: TodoPageLoadingStateState): any {
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

export default component(TodoPageLoadingState)
