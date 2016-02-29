/* @flow */
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

function normalizeTodoItems(recs: Array<TodoItem>): TodoItemCollection {
    return new TodoItemCollection(recs)
}

export default function LoadableTodoItemCollection(
    items: TodoItemCollection,
    fetcher: Fetcher
): Promise<TodoItemCollection> {
    return fetcher.load('todos', {
        method: 'GET'
    }).then(normalizeTodoItems)
}
