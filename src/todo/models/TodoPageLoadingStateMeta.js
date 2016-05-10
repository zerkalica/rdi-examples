/* @flow */

import {meta} from 'reactive-di-observable/annotations'

import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

import {
    toggleAll,
    clearCompleted,
    removeTodoItem,
    toggleTodoItem,
    commitAdding,
    commitEditing
} from 'reactive-di-todomvc/todo/actions/TodoCrudActions'

@meta(
    TodoItemCollectionLoader,
    toggleAll,
    clearCompleted,
    removeTodoItem,
    toggleTodoItem,
    commitEditing,
    commitAdding
)
export default class TodoPageLoadingStateMeta {
    pending: boolean;
    success: boolean;
    error: ?Error;
}
