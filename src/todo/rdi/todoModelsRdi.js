/* @flow */

import {model, loader} from 'reactive-di/dist/annotations'

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import LoadableTodoItemCollection from 'reactive-di-todomvc/todo/loaders/LoadableTodoItemCollection'

import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'

const deps: Array<Annotation> = [
    model(TodoGroupState),
    model(TodoItemAdding),
    model(TodoItemEditing),
    model(TodoAppState),
    model(TodoItemCollection),

    loader(LoadableTodoItemCollection, TodoItemCollection, Fetcher)
];

export default deps
