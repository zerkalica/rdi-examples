/* @flow */
import {component} from 'reactive-di-react'
import {meta} from 'reactive-di-observable/configurations'

import type {Annotation} from 'reactive-di/i/coreInterfaces'

import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import EventHelper from 'reactive-di-todomvc/common/helpers/EventHelper'

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

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'

import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'
import tr from 'reactive-di-todomvc/common/services/tr'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'
import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

const deps: Array<Annotation> = [
    component(TodoHeader, {
        tr,
        ErrorableElement,
        addingItem: TodoItemAdding,
        commitAdding,
        changeAdding,
        cancelAdding,
        helper: EventHelper
    }),

    component(TodoFooter, {
        tr,
        router: AbstractRouterManager,
        data: todoItemsFacet,
        helper: EventHelper,
        clearCompleted,
        showAll,
        showActive,
        showCompleted
    }),

    component(TodoElement, {
        ErrorableElement,
        removeTodoItem,
        toggleTodoItem,

        beginEditing,
        commitEditing,
        cancelEditing,
        changeEditing,
        editingItem: TodoItemEditing,
        helper: EventHelper
    }),

    component(TodoElementList, {
        TodoElement,
        data: todoItemsFacet
    }),
    component(TodoMain, {
        tr,
        toggleAll,
        isAllCompleted: isAllCompletedFacet,
        TodoElementList,
        helper: EventHelper
    }),

    meta(TodoPageLoadingStateMeta,
        TodoItemCollection,
        toggleAll,
        removeTodoItem,
        toggleTodoItem,
        commitEditing,
        commitAdding
    ),

    component(TodoPageLoadingState, {
        deps: {
            tr,
            meta: TodoPageLoadingStateMeta
        }
    }),
    component(TodoPage, {
        TodoPageLoadingState,
        TodoHeader,
        TodoMain,
        TodoFooter,
        data: todoItemsFacet
    })
];

export default deps
