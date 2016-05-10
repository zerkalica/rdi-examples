/* @flow */

import type {
    Tr,
    EventHelper
} from 'reactive-di-todomvc/i/commonInterfaces'
import type {
    ToggleAll
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Widget} from 'reactive-di-react/i/interfaces'

import {component} from 'reactive-di-react/annotations'

type TodoMainProps = {
    tr: Tr;
    toggleAll: ToggleAll;
    isAllCompleted: boolean;
    TodoElementList: Widget<void>;
    helper: EventHelper;
};

function TodoMain({
    tr,
    toggleAll,
    isAllCompleted,
    TodoElementList,
    helper
}: TodoMainProps): any {
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

export default component(TodoMain)
