/* @flow */

import React, {Component} from 'react'
import rdi from '../../common/annotations'

import TodoAppPageFacet from '../facets/TodoAppPageFacet'
import TodoElement from '../components/TodoElement'
import TodoHeader from '../components/TodoHeader'
import TodoItemAdding from '../models/TodoItemAdding'
import TodoItemEditing from '../models/TodoItemEditing'
import TodoWidget from '../components/TodoWidget'
import {
    beginEditing,
    cancelEditing,
    assignEditing,
    assignAdding
} from '../actions/TodoEditingActions'

const TodoElementInj = rdi.observable({
    editingItem: TodoItemEditing,
    assign: assignEditing,
    beginEditing,
    cancelEditing
})(TodoElement)

const TodoHeaderInj = rdi.observable({
    addingItem: TodoItemAdding,
    assign: assignAdding
})(TodoHeader)

class TodoAppPageChildWidgets {
    TodoElement: TodoElement;
    TodoHeader: TodoHeader;

    constructor(
        TodoElement: TodoElement,
        TodoHeader: TodoHeader
    ) {
        this.TodoHeader = TodoHeaderInj
        this.TodoElement = TodoElementInj
    }
}
const TodoAppPageChildWidgetsInj = rdi.klass()(TodoAppPageChildWidgets)

const TodoAppPage = rdi.observable({
    widgets: TodoAppPageChildWidgetsInj,
    props: TodoAppPageFacet
})(TodoWidget)

export default TodoAppPage
