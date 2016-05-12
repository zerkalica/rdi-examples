/* @flow */

import type {ConfigItem} from 'reactive-di'

import {observable, setter} from 'reactive-di-observable/configurations'

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

const deps: Array<ConfigItem> = [
    observable(TodoGroupState),
    observable(TodoItemAdding),
    observable(TodoItemEditing),

    setter(TodoItemCollectionLoader),
    observable(TodoItemCollection, {
        pending: true,
        loader: TodoItemCollectionLoader
    })
];

export default deps
