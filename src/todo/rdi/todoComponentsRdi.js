/* @flow */

import type {RouterManager} from 'modern-router/i/routerInterfaces'
import type {Annotation} from 'reactive-di/i/coreInterfaces'
import type {
    Tr,
    EventHelper
} from 'reactive-di-todomvc/i/commonInterfaces'
import type {
    CommitAdding,
    TodoItemsFacet
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

import {
    beginEditing,
    cancelEditing,
    changeEditing
} from 'reactive-di-todomvc/todo/actions/TodoEditingActions'

import {
    toggleAll,
    clearCompleted,
    removeTodoItem,
    toggleTodoItem,

    commitEditing
} from 'reactive-di-todomvc/todo/actions/TodoCrudActions'

import {
    showAll,
    showActive,
    showCompleted
} from 'reactive-di-todomvc/todo/actions/TodoFilterActions'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'

import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'
import TodoItemCollectionLoader from 'reactive-di-todomvc/todo/loaders/TodoItemCollectionLoader'

const deps: Array<Annotation> = [
    component(TodoHeader),

    component(TodoFooter, {
        props: {
            tr: (_: Tr),
            router: (_: RouterManager),
            data: (_: TodoItemsFacet),
            helper: (_: EventHelper),
            clearCompleted,
            showAll,
            showActive,
            showCompleted
        }
    }),

    component(TodoElement, {
        props: {
            ErrorableElement,
            removeTodoItem,
            toggleTodoItem,

            beginEditing,
            commitEditing,
            cancelEditing,
            changeEditing,
            editingItem: TodoItemEditing,
            helper: (_: EventHelper)
        }
    }),

    component(TodoElementList, {
        props: {
            TodoElement,
            data: (_: TodoItemsFacet)
        }
    }),
    component(TodoMain, {
        props: {
            tr: (_: Tr),
            toggleAll,
            isAllCompleted: isAllCompletedFacet,
            TodoElementList,
            helper: (_: EventHelper)
        }
    }),

    meta(TodoPageLoadingStateMeta,
        TodoItemCollectionLoader,
        toggleAll,
        clearCompleted,
        removeTodoItem,
        toggleTodoItem,
        commitEditing,
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
