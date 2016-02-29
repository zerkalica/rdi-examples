/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'

import {
    cancelAdding,
    changeAdding,

    beginEditing,
    cancelEditing,
    changeEditing
} from 'reactive-di-todomvc/todo/actions/TodoEditingActions'

import {
    toggleAll,
    clearCompleted,
    removeTodoItem,
    toggleTodoItem,

    commitAdding,
    commitEditing
} from 'reactive-di-todomvc/todo/actions/TodoCrudActions'

import {
    showAll,
    showActive,
    showCompleted
} from 'reactive-di-todomvc/todo/actions/TodoFilterActions'

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import type {AnyAnnotation} from 'reactive-di/i/annotationInterfaces'

const {asyncsetter, syncsetter} = rdi

const deps: Array<AnyAnnotation> = [
    syncsetter(showAll, TodoGroupState),
    syncsetter(showActive, TodoGroupState),
    syncsetter(showCompleted, TodoGroupState),

    syncsetter(cancelAdding, TodoItemAdding),
    syncsetter(changeAdding, TodoItemAdding),

    syncsetter(beginEditing, TodoItemEditing),
    syncsetter(cancelEditing, TodoItemEditing),
    syncsetter(changeEditing, TodoItemEditing),

    asyncsetter(toggleAll, TodoAppState, Fetcher, TodoGroupState),
    asyncsetter(clearCompleted, TodoItemCollection, Fetcher),
    asyncsetter(removeTodoItem, TodoItemCollection, Fetcher),
    asyncsetter(toggleTodoItem, TodoItemCollection, Fetcher),

    asyncsetter(commitAdding, TodoAppState, Fetcher),
    asyncsetter(commitEditing, TodoAppState, Fetcher)
];

export default deps
