/* @flow */

import type {
    TodoItemsFacet
} from 'reactive-di-todomvc/todo'
import type {
    FlowFix,
    Element
} from 'reactive-di-todomvc/common'
import type {ITodoElement} from 'reactive-di-todomvc/todo/components/TodoElement'

type TodoElementListProps = {
    TodoElement: ITodoElement;
    data: TodoItemsFacet
};

export type ITodoElementList = FlowFix<void>;

export default function TodoElementList({
    data,
    TodoElement
}: TodoElementListProps): Element {
    return (
        <ul className="todo-list">
            {data.items.map((item) => <TodoElement item={item} key={item.id} />)}
        </ul>
    )
}
