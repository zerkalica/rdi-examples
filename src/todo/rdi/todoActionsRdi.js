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
} from 'reactive-di-todomvc/todo'

import _ from 'babel-plugin-transform-metadata/_'

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

const deps: Array<ConfigItem> = [
    [(_: ShowAll), compose(showAll)],
    [(_: ShowActive), compose(showActive)],
    [(_: ShowCompleted), compose(showCompleted)],

    [(_: CancelAdding), setter(cancelAdding)],
    [(_: CommitAdding), setter(commitAdding)],
    [(_: ChangeAdding), setter(changeAdding)],

    [(_: RemoveTodoItem), setter(removeTodoItem)],
    [(_: ToggleTodoItem), setter(toggleTodoItem)],

    [(_: BeginEditing), setter(beginEditing)],
    [(_: CancelEditing), setter(cancelEditing)],
    [(_: ChangeEditing), setter(changeEditing)],
    [(_: CommitEditing), setter(commitEditing)],

    [(_: ToggleAll), setter(toggleAll)],
    [(_: ClearCompleted), setter(clearCompleted)]
];

export default deps
