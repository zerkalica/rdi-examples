/* @flow */
import {component} from 'reactive-di-react/annotations'

import type {
    TodoFooterPropsData
} from 'reactive-di-todomvc/i/todoInterfaces'

import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'

type TodoMainPageProps = {
    todoPageLoadingState: TodoPageLoadingState;
    todoHeader: TodoHeader;
    todoMain: TodoMain;
    todoFooter: TodoFooter;
    data: TodoFooterPropsData;
}

function TodoPage({
    data,
    todoPageLoadingState,
    todoMain,
    todoFooter,
    todoHeader
}: TodoMainPageProps): any {
    return (
        <section className="todowrap">
            <div>
                <todoPageLoadingState/>
                <section className="todoapp">
                    <todoHeader/>
                    {data.itemsCount > 0 ? <todoMain/> : null}
                    {data.totalCount > 0 ? <todoFooter/> : null}
                </section>
            </div>
        </section>
    )
}

export default component(TodoPage)
