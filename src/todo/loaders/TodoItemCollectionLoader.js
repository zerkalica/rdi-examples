/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import TodoQuery from 'reactive-di-todomvc/todo/queries/TodoQuery'
import {promiseToObservable} from 'reactive-di'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

function todoItemCollectionLoader(
    items: TodoItemCollection,
    fetcher: Fetcher,
    query: TodoQuery
) {
    return promiseToObservable(
        fetcher.load('todos', {
            method: 'GET'
        }).then((recs: Array<TodoItem>) => new TodoItemCollection(recs))
    )
}
export default rdi.loader(
    TodoItemCollection,
    Fetcher,
    TodoQuery
)(todoItemCollectionLoader)
