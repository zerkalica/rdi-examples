/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import TodoQuery from 'reactive-di-todomvc/todo/queries/TodoQuery'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

function normalizeTodoItems(recs: Array<TodoItem>): TodoItemCollection {
    return new TodoItemCollection(recs)
}

function TodoItemCollectionLoader(
    items: TodoItemCollection,
    fetcher: Fetcher,
    query: TodoQuery // eslint-disable-line
): Promise<TodoItemCollection> {
    return fetcher.load('todos').then(normalizeTodoItems)
}

export default rdi.loader(
    TodoItemCollection,
    Fetcher,
    TodoQuery
)(TodoItemCollectionLoader)
