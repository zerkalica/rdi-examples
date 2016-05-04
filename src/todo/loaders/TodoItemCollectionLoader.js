/* @flow */
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import type {Operation} from 'reactive-di-observable/i/interfaces'

function normalizeTodoItems(recs: Array<TodoItem>): Array<Operation> {
    return [
        {object: new TodoItemCollection(recs)}
    ]
}

export default function TodoItemCollectionLoader(
    fetcher: Fetcher
): Array<Operation> {
    return [
        {
            promise: () => fetcher.load('todos', {
                method: 'GET'
            }).then(normalizeTodoItems)
        }
    ]
}
