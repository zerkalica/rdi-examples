/* @flow */
import {compose} from 'reactive-di/configurations'
import {setter} from 'reactive-di-observable/configurations'

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

import type {Annotation} from 'reactive-di/i/coreInterfaces'

const deps: Array<Annotation> = [
    compose(showAll),
    compose(showActive),
    compose(showCompleted),

    setter(cancelAdding),
    setter(changeAdding),

    setter(beginEditing),
    setter(cancelEditing),
    setter(changeEditing),

    setter(toggleAll),
    setter(clearCompleted),
    setter(removeTodoItem),
    setter(toggleTodoItem),

    setter(commitAdding),
    setter(commitEditing)
];

export default deps
