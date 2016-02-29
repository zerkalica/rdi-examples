/* @flow */
import React from 'react'
import type {EntityMeta} from 'reactive-di/i/nodeInterfaces'
import type {Widget, Element} from 'reactive-di-react/i/interfaces'

type TodoMainPageProps = {
    TodoHeader: Widget<void>;
    TodoMain: Widget<void>;
    TodoFooter: Widget<void>;
    meta: EntityMeta<Error>;
    data: {
        itemsCount: number;
    }
}

export default function TodoMainPage({
    meta,
    data,
    TodoMain,
    TodoFooter,
    TodoHeader
}: TodoMainPageProps): Element {
    return (
        <section className="todowrap">
            {meta.pending ?
                <div className="todoloader">
                    <h3>Pending...</h3>
                </div>
            : null}
            {meta.rejected ?
                <div className="todoerror">
                    {meta.reason ? meta.reason.message : 'error'}
                </div>
            : null}
            <section className="todoapp">
                <TodoHeader/>
                {data.itemsCount > 0 ? <TodoMain/> : null}
                {data.itemsCount > 0 ? <TodoFooter/> : null}
            </section>
        </section>
    )
}
