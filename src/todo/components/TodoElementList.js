/* @flow */

import {component} from 'reactive-di-react/annotations'

import type {
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'

import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'

type TodoElementListProps = {
    todoElement: TodoElement;
    data: TodoItemsFacet
}

function TodoElementList({
    data,
    todoElement
}: TodoElementListProps): any {
    return (
        <ul className="todo-list">
            {data.items.map((item) => <todoElement item={item} key={item.id} />)}
        </ul>
    )
}

export default component(TodoElementList)
