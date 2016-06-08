/* @flow */
import _ from 'babel-plugin-transform-metadata/_'

import {component} from 'reactive-di-observable/annotations'
import type {
    IsDebug,
    Element
} from 'reactive-di-todomvc/common/i'

import type {
    IAuthArea
} from 'reactive-di-todomvc/auth/i'

import type {
    TodoItemsFacet,
    IsAllCompleted,
    ITodoHeader,
    ITodoMain,
    ITodoFooter,
    ITodoPageLoadingState
} from 'reactive-di-todomvc/todo/i'

import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'
import TodoPageLoadingStateImpl from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoHeaderImpl from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoFooterImpl from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoMainImpl from 'reactive-di-todomvc/todo/components/TodoMain'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

import type {IErrorRate} from 'reactive-di-todomvc/mockServer/components/ErrorRate'

type TodoMainPageProps = {
    isDebug: IsDebug,
    AuthArea: IAuthArea,
    ErrorRate: IErrorRate,
    TodoPageLoadingState: ITodoPageLoadingState;
    TodoHeader: ITodoHeader;
    TodoMain: ITodoMain;
    TodoFooter: ITodoFooter;
    data: TodoItemsFacet;
}

export default function TodoPage({
    data,
    isDebug,
    AuthArea,
    ErrorRate,
    TodoPageLoadingState,
    TodoMain,
    TodoFooter,
    TodoHeader
}: TodoMainPageProps): Element {
    return (
        <AuthArea>
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
        </AuthArea>
    )
}
component([
    [(_: TodoItemsFacet), todoItemsFacet],
    [(_: IsAllCompleted), isAllCompletedFacet],
    TodoQueryArgs,
    TodoPageLoadingStateMeta,
    [(_: ITodoMain), TodoMainImpl],
    [(_: ITodoPageLoadingState), TodoPageLoadingStateImpl],
    [(_: ITodoHeader), TodoHeaderImpl],
    [(_: ITodoFooter), TodoFooterImpl]
])(TodoPage)
