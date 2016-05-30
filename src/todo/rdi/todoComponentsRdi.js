/* @flow */

import type {ConfigItem} from 'reactive-di'
import type {
    ITodoElement,
    ITodoHeader,
    ITodoMain,
    ITodoFooter,
    ITodoPageLoadingState,
    ITodoPage,
    ITodoElementList,

    CommitAdding,
    RemoveTodoItem,
    ToggleTodoItem,

    CommitEditing,
    ToggleAll,
    ClearCompleted
} from 'reactive-di-todomvc/todo/i'

import _ from 'babel-plugin-transform-metadata/_'

import {component} from 'reactive-di-react/configurations'
import {meta} from 'reactive-di-observable/configurations'

import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'

import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'
import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

const deps: Array<ConfigItem> = [
    [(_: ITodoHeader), component(TodoHeader)],
    [(_: ITodoFooter), component(TodoFooter)],
    [(_: ITodoElement), component(TodoElement)],
    [(_: ITodoElementList), component(TodoElementList)],
    [(_: ITodoMain), component(TodoMain)],
    [(_: ITodoPageLoadingState), component(TodoPageLoadingState)],
    [(_: ITodoPage), component(TodoPage)],

    meta(TodoPageLoadingStateMeta,
        TodoItemCollectionLoader,

        (_: ToggleAll),
        (_: ClearCompleted),
        (_: RemoveTodoItem),
        (_: ToggleTodoItem),
        (_: CommitEditing),
        (_: CommitAdding)
    )
];

export default deps
