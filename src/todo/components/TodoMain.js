/* @flow */

import type {
    Tr,
    EventHelper
} from 'reactive-di-todomvc/i/commonInterfaces'
import type {
    ToggleAll,
    IsAllCompleted
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'

import TodoElementListImpl from 'reactive-di-todomvc/todo/components/TodoElementList'

type TodoMainProps = {
    tr: Tr;
    toggleAll: ToggleAll;
    isAllCompleted: IsAllCompleted;
    TodoElementList: TodoElementListImpl;
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
