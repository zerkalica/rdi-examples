/* @flow */
import React from 'react'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Widget, Element} from 'reactive-di-todomvc/i/commonInterfaces'

type TodoElementListProps = {
    TodoElement: Widget<{item: TodoItem, key: string}>;
    data: {
        items: Array<TodoItem>;
    }
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
