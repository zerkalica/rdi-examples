/* @flow */

import type {Annotation} from 'reactive-di/i/coreInterfaces'
import type {
    Tr,
    EventHelper
} from 'reactive-di-todomvc/i/commonInterfaces'
import type {
    TodoItemsFacet,
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

import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'

import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'
import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

const deps: Array<Annotation> = [
    component(TodoHeader),
    component(TodoFooter),
    component(TodoElement),
    component(TodoElementList),

    component(TodoMain, {
        props: {
            tr: (_: Tr),
            toggleAll: (_: ToggleAll),
            isAllCompleted: isAllCompletedFacet,
            TodoElementList,
            helper: (_: EventHelper)
        }
    }),

    meta(TodoPageLoadingStateMeta,
        TodoItemCollectionLoader,
        (_: ToggleAll),
        (_: ClearCompleted),
        (_: RemoveTodoItem),
        (_: ToggleTodoItem),
        (_: CommitEditing),
        (_: CommitAdding)
    ),

    component(TodoPageLoadingState, {
        props: {
            tr: (_: Tr),
            meta: TodoPageLoadingStateMeta
        }
    }),
    component(TodoPage, {
        props: {
            TodoPageLoadingState,
            TodoHeader,
            TodoMain,
            TodoFooter,
            data: (_: TodoItemsFacet)
        }
    })
];

export default deps
