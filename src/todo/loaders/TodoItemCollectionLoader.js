/* @flow */
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import type {OperationItem} from 'reactive-di-observable/i/interfaces'

function normalizeTodoItems(recs: Array<TodoItem>): Collection<TodoItem> {
    return new TodoItemCollection(recs)
}

export default function TodoItemCollectionLoader(
    fetcher: Fetcher
): Array<OperationItem> {
    return [
        {
            promise: fetcher.load('todos', {
                method: 'GET'
            }).then(normalizeTodoItems)
        }
    ]
}
