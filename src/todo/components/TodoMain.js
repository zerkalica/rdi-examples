/* @flow */

import {component} from 'reactive-di-observable/annotations'

import type {Tr} from 'any-translate'
import type {
    Element,
    EventHelper
} from 'reactive-di-todomvc/common/i'
import type {
    ITodoElementList,
    ToggleAll,
    IsAllCompleted
} from 'reactive-di-todomvc/todo/i'

type TodoMainProps = {
    tr: Tr;
    toggleAll: ToggleAll;
    isAllCompleted: IsAllCompleted;
    TodoElementList: ITodoElementList;
    helper: EventHelper;
};

export default function TodoMain({
    tr,
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
            <label htmlFor="toggle-all">{tr('Mark all as complete')}</label>
            <TodoElementList/>
        </section>
    )
}
component()(TodoMain)
