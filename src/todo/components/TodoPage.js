/* @flow */
import type {
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'

import type {Element} from 'reactive-di-react/i/interfaces'

import TodoHeaderImpl from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMainImpl from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoFooterImpl from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoPageLoadingStateImpl from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'

type TodoMainPageProps = {
    TodoPageLoadingState: TodoPageLoadingStateImpl;
    TodoHeader: TodoHeaderImpl;
    TodoMain: TodoMainImpl;
    TodoFooter: TodoFooterImpl;
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
