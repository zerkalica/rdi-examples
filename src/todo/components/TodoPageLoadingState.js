/* @flow */

import type {
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'
import type {TokenizedTranslate} from 'any-translate'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

type TodoPageLoadingStateProps = {
    tr: TokenizedTranslate;
    meta: TodoPageLoadingStateMeta;
}

export type ITodoPageLoadingState = FlowFix<void>;

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
