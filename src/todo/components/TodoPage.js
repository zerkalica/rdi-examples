/* @flow */
import React from 'react'
import type {Widget, Element} from 'reactive-di-react/i/interfaces'

type TodoMainPageProps = {
    TodoPageLoadingState: Widget<void>;
    TodoHeader: Widget<void>;
    TodoMain: Widget<void>;
    TodoFooter: Widget<void>;
    data: {
        error: ?string;
        totalCount: number;
        itemsCount: number;
    }
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
            {data.error ?
                data.error
            :
                <div>
                    <TodoPageLoadingState/>
                    <section className="todoapp">
                        <TodoHeader/>
                        {data.itemsCount > 0 ? <TodoMain/> : null}
                        {data.totalCount > 0 ? <TodoFooter/> : null}
                    </section>
                </div>
            }
        </section>
    )
}
