/* @flow */

import type {TodoItemsFacet} from 'reactive-di-todomvc/todo'
import type {
    IsDebug,
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'

import type {ITodoHeader} from 'reactive-di-todomvc/todo/components/TodoHeader'
import type {ITodoMain} from 'reactive-di-todomvc/todo/components/TodoMain'
import type {ITodoFooter} from 'reactive-di-todomvc/todo/components/TodoFooter'
import type {ITodoPageLoadingState} from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import type {IErrorRate} from 'reactive-di-todomvc/mockServer/components/ErrorRate'

type TodoMainPageProps = {
    isDebug: IsDebug,
    ErrorRate: IErrorRate,
    TodoPageLoadingState: ITodoPageLoadingState;
    TodoHeader: ITodoHeader;
    TodoMain: ITodoMain;
    TodoFooter: ITodoFooter;
    data: TodoItemsFacet;
}

export type ITodoPage = FlowFix<void>;

export default function TodoPage({
    data,
    isDebug,
    ErrorRate,
    TodoPageLoadingState,
    TodoMain,
    TodoFooter,
    TodoHeader
}: TodoMainPageProps): Element {
    return (
        <section className="todowrap">
            <div>
                <TodoPageLoadingState/>
                <section className="todoapp">
                    <TodoHeader/>
                    {data.itemsCount > 0 ? <TodoMain/> : null}
                    {data.totalCount > 0 ? <TodoFooter/> : null}
                </section>
            </div>
            {isDebug
                ? <ErrorRate />
                : null
            }
        </section>
    )
}
