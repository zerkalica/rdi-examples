/* @flow */
import _ from 'babel-plugin-transform-metadata/_'

import {component} from 'reactive-di-observable/annotations'
import type {
    Element
} from 'reactive-di-todomvc/common/i'

import type {
    IAuthLayout
} from 'reactive-di-todomvc/auth/i'

import type {
    TodoItemsFacet,
    IsAllCompleted,
    ITodoHeader,
    ITodoMain,
    ITodoFooter,
    ITodoPageLoadingState
} from 'reactive-di-todomvc/todo/i'

import DebugConfig from 'reactive-di-todomvc/common/models/DebugConfig'

import TodoFooterImpl from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoHeaderImpl from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMainImpl from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoPageLoadingStateImpl from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

import type {IErrorRate} from 'reactive-di-todomvc/mockServer/components/ErrorRate'

type TodoMainPageProps = {
    debug: DebugConfig,
    AuthLayout: IAuthLayout,
    ErrorRate: IErrorRate,
    TodoPageLoadingState: ITodoPageLoadingState;
    TodoHeader: ITodoHeader;
    TodoMain: ITodoMain;
    TodoFooter: ITodoFooter;
    data: TodoItemsFacet;
}

export default function TodoPage({
    data,
    debug,
    AuthLayout,
    ErrorRate,
    TodoPageLoadingState,
    TodoMain,
    TodoFooter,
    TodoHeader
}: TodoMainPageProps): Element {
    return (
        <AuthLayout>
            <section className="todowrap">
                <div>
                    <TodoPageLoadingState/>
                    <section className="todoapp">
                        <TodoHeader/>
                        {data.itemsCount > 0 ? <TodoMain/> : null}
                        {data.totalCount > 0 ? <TodoFooter/> : null}
                    </section>
                </div>
                {debug.isEnabled
                    ? <ErrorRate />
                    : null
                }
            </section>
        </AuthLayout>
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
