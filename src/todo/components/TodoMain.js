/* @flow */

import type {Tr} from 'any-translate'
import type {
    FlowFix,
    Element,
    EventHelper
} from 'reactive-di-todomvc/common'
import type {
    ToggleAll,
    IsAllCompleted
} from 'reactive-di-todomvc/todo'

import type {ITodoElementList} from 'reactive-di-todomvc/todo/components/TodoElementList'

type TodoMainProps = {
    tr: Tr;
    toggleAll: ToggleAll;
    isAllCompleted: IsAllCompleted;
    TodoElementList: ITodoElementList;
    helper: EventHelper;
};

export type ITodoMain = FlowFix<void>;

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
