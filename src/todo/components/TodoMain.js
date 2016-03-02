/* @flow */
import React from 'react'
import type {EventHelper} from 'reactive-di-todomvc/i/commonInterfaces'
import type {Widget, Element} from 'reactive-di-react/i/interfaces'

type TodoMainProps = {
    toggleAll(): void;
    isAllCompleted: boolean;
    TodoElementList: Widget<void>;
    helper: EventHelper;
};

export default function TodoMain({
    toggleAll,
    isAllCompleted,
    TodoElementList,
    helper
}: TodoMainProps): Element {
    return (
        <section className="main">
            <input
                className="toggle-all"
                id="toggle-all"
                onChange={helper.click(toggleAll)}
                checked={isAllCompleted}
                type="checkbox"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoElementList/>
        </section>
    )
}
