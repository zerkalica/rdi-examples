/* @flow */
import {observable, setter} from 'reactive-di-observable/annotations'

import type {Operation} from 'reactive-di-observable'
import type {AuthFetch} from 'reactive-di-todomvc/auth/i'
import type {TodoItem} from 'reactive-di-todomvc/todo/i'
import BaseCollection from 'reactive-di-todomvc/common/helpers/BaseCollection'

export type TodoItemRec = {
    id?: string;
    title?: string;
    isCompleted?: boolean;
}

// implements TodoItem
export class TodoItemImpl {
    id: string;
    title: string;
    isCompleted: boolean;

    constructor(rec: TodoItemRec = {}) {
        this.id = rec.id || ''
        this.title = rec.title || this.id
        this.isCompleted = rec.isCompleted || false
    }
}

class TodoItemCollection extends BaseCollection<TodoItem> {
    createItem(rec: TodoItemRec): TodoItem {
        return new TodoItemImpl(rec)
    }
}

function normalizeTodoItems(recs: Array<TodoItem>): Array<Operation> {
    return [
        {object: new TodoItemCollection(recs)}
    ]
}

export function TodoItemCollectionLoader(
    fetch: AuthFetch
): Array<Operation> {
    return [
        {
            promise: () => fetch('todos', {
                method: 'GET'
            }).then(normalizeTodoItems)
        }
    ]
}
setter({
    pending: true
})(TodoItemCollectionLoader)

observable({
    key: 'TodoItemCollection',
    loader: TodoItemCollectionLoader
})(TodoItemCollection)

export default TodoItemCollection
