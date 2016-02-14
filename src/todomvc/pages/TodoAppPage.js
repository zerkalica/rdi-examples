/* @flow */

import React, {Component} from 'react'
import {statefull} from 'reactive-di-react'

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

const TodoElementInj = statefull({
    editingItem: TodoItemEditing,
    assign: assignEditing,
    beginEditing,
    cancelEditing
})(TodoElement)

const TodoHeaderInj = statefull({
    addingItem: TodoItemAdding,
    assign: assignAdding
})(TodoHeader)

const TodoAppPage = statefull({
    TodoElement: TodoElementInj,
    TodoHeader: TodoHeaderInj,
    props: TodoAppPageFacet
})(TodoWidget)

export default TodoAppPage
