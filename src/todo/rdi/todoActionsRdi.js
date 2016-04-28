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

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'

import type {Annotation} from 'reactive-di/i/coreInterfaces'

const deps: Array<Annotation> = [
    compose(showAll, AbstractRouterManager),
    compose(showActive, AbstractRouterManager),
    compose(showCompleted, AbstractRouterManager),

    setter(cancelAdding, TodoItemAdding),
    setter(changeAdding, TodoItemAdding),

    setter(beginEditing, TodoItemEditing),
    setter(cancelEditing, TodoItemEditing),
    setter(changeEditing, TodoItemEditing),

    setter(toggleAll, TodoGroupState, TodoItemCollection, Fetcher),
    setter(clearCompleted, TodoItemCollection, Fetcher),
    setter(removeTodoItem, TodoItemCollection, Fetcher),
    setter(toggleTodoItem, TodoItemCollection, Fetcher),

    setter(commitAdding, TodoItemCollection, TodoItemAdding, Fetcher),
    setter(commitEditing, TodoItemCollection, TodoItemEditing, Fetcher)
];

export default deps
