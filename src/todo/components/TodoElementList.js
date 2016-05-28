/* @flow */
import type {
    Element
} from 'reactive-di-todomvc/common'
import type {
    ITodoElement,
    TodoItemsFacet
} from 'reactive-di-todomvc/todo'

type TodoElementListProps = {
    TodoElement: ITodoElement;
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
