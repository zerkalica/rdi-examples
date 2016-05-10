/* @flow */
import type {
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'

import type {Element} from 'reactive-di-react/i/interfaces'

import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'

type TodoMainPageProps = {
    TodoPageLoadingState: TodoPageLoadingState;
    TodoHeader: TodoHeader;
    TodoMain: TodoMain;
    TodoFooter: TodoFooter;
    data: TodoItemsFacet;
}

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
