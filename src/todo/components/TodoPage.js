/* @flow */

import type {TodoItemsFacet} from 'reactive-di-todomvc/todo/i'
import type {
    IsDebug,
    Element
} from 'reactive-di-todomvc/common/i'

import type {
    IAuthArea
} from 'reactive-di-todomvc/auth/i'

import type {
    ITodoHeader,
    ITodoMain,
    ITodoFooter,
    ITodoPageLoadingState
} from 'reactive-di-todomvc/todo/i'

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
