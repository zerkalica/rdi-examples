/* @flow */

import type {ConfigItem} from 'reactive-di'

import type {
    CancelAdding,
    CommitAdding,
    ChangeAdding,

    RemoveTodoItem,
    ToggleTodoItem,

    BeginEditing,
    CommitEditing,
    CancelEditing,
    ChangeEditing,

    ToggleAll,
    ClearCompleted,

    ShowAll,
    ShowCompleted,
    ShowActive
} from 'reactive-di-todomvc/todo/i'

import _ from 'babel-plugin-transform-metadata/_'

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

const deps: Array<ConfigItem> = [
    [(_: ShowAll), showAll],
    [(_: ShowActive), showActive],
    [(_: ShowCompleted), showCompleted],

    [(_: CancelAdding), cancelAdding],
    [(_: CommitAdding), commitAdding],
    [(_: ChangeAdding), changeAdding],

    [(_: RemoveTodoItem), removeTodoItem],
    [(_: ToggleTodoItem), toggleTodoItem],

    [(_: BeginEditing), beginEditing],
    [(_: CancelEditing), cancelEditing],
    [(_: ChangeEditing), changeEditing],
    [(_: CommitEditing), commitEditing],

    [(_: ToggleAll), toggleAll],
    [(_: ClearCompleted), clearCompleted]
];

export default deps
