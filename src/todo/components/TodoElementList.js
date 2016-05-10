/* @flow */

import type {
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'
import TodoElementImpl from 'reactive-di-todomvc/todo/components/TodoElement'

type TodoElementListProps = {
    TodoElement: TodoElementImpl;
    data: TodoItemsFacet
};

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
