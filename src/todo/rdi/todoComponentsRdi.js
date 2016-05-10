/* @flow */

import type {Annotation} from 'reactive-di/i/coreInterfaces'
import type {
    CommitAdding,
    RemoveTodoItem,
    ToggleTodoItem,

    CommitEditing,
    ToggleAll,
    ClearCompleted
} from 'reactive-di-todomvc/i/todoInterfaces'

import _ from 'babel-plugin-transform-metadata/_'

import {component} from 'reactive-di-react'
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

const deps: Array<Annotation> = [
    component(TodoHeader),
    component(TodoFooter),
    component(TodoElement),
    component(TodoElementList),
    component(TodoMain),
    component(TodoPageLoadingState),
    component(TodoPage),

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
