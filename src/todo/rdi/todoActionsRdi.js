/* @flow */
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

import type {Dependency} from 'reactive-di/i/coreInterfaces'

const deps: Array<Dependency> = [
    showAll,
    showActive,
    showCompleted,

    cancelAdding,
    changeAdding,

    beginEditing,
    cancelEditing,
    changeEditing,

    toggleAll,
    clearCompleted,
    removeTodoItem,
    toggleTodoItem,

    commitAdding,
    commitEditing
];

export default deps
