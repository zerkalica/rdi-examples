/* @flow */
import {component} from 'reactive-di-react'
import {meta} from 'reactive-di/dist/annotations'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'

import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoMainPage from 'reactive-di-todomvc/todo/components/TodoMainPage'

import EventHelperImpl from 'reactive-di-todomvc/common/helpers/EventHelperImpl'

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

const deps: Array<Annotation> = [
    component(TodoHeader, {
        addingItem: TodoItemAdding,
        commitAdding,
        changeAdding,
        cancelAdding,
        helper: EventHelperImpl
    }),

    component(TodoFooter, {
        data: todoItemsFacet,
        helper: EventHelperImpl,
        clearCompleted,
        showAll,
        showActive,
        showCompleted
    }),

    component(TodoElement, {
        removeTodoItem,
        toggleTodoItem,

        beginEditing,
        commitEditing,
        cancelEditing,
        changeEditing,
        // item: props(),
        editingItem: TodoItemEditing,
        helper: EventHelperImpl
    }),

    component(TodoElementList, {
        TodoElement,
        data: todoItemsFacet
    }),
    component(TodoMain, {
        toggleAll,
        isAllCompleted: isAllCompletedFacet,
        TodoElementList,
        helper: EventHelperImpl
    }),
    component(TodoMainPage, {
        TodoHeader,
        TodoMain,
        TodoFooter,
        meta: meta(todoItemsFacet),
        data: todoItemsFacet
    })
];

export default deps
