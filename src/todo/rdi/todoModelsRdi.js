/* @flow */

import {observable, setter} from 'reactive-di-observable/configurations'

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import type {Annotation} from 'reactive-di/i/coreInterfaces'

const deps: Array<Annotation> = [
    observable(TodoGroupState),
    observable(TodoItemAdding),
    observable(TodoItemEditing),

    setter(TodoItemCollectionLoader, Fetcher),
    observable(TodoItemCollection, {
        pending: true,
        loader: TodoItemCollectionLoader
    })
];

export default deps
