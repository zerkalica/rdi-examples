/* @flow */

import type {TodoItemsFacet} from 'reactive-di-todomvc/todo'
import type {
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'

import type {ITodoHeader} from 'reactive-di-todomvc/todo/components/TodoHeader'
import type {ITodoMain} from 'reactive-di-todomvc/todo/components/TodoMain'
import type {ITodoFooter} from 'reactive-di-todomvc/todo/components/TodoFooter'
import type {ITodoPageLoadingState} from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'

type TodoMainPageProps = {
    TodoPageLoadingState: ITodoPageLoadingState;
    TodoHeader: ITodoHeader;
    TodoMain: ITodoMain;
    TodoFooter: ITodoFooter;
    data: TodoItemsFacet;
}

export type ITodoPage = FlowFix<void>;

export default function TodoPage({
    data,
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
        </section>
    )
}
