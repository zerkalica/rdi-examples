/* @flow */

import type {
    AuthFetch
} from 'reactive-di-todomvc/auth/i'

import type {TodoItem} from 'reactive-di-todomvc/todo/i'
import type {Operation} from 'reactive-di-observable'

import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

function normalizeTodoItems(recs: Array<TodoItem>): Array<Operation> {
    return [
        {object: new TodoItemCollection(recs)}
    ]
}

export default function TodoItemCollectionLoader(
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
