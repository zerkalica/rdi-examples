/* @flow */

import React, {Component} from 'react'
import {statefull} from 'reactive-di-react'

import TodoAppPageFacet from '../facets/TodoAppPageFacet'
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
import {TodoElement} from '../components/TodoItemList'

class TodoElementInj extends TodoElement {}
statefull({
    editingItem: TodoItemEditing,
    assign: assignEditing,
    beginEditing,
    cancelEditing
})(TodoElementInj)

class TodoHeaderInj extends TodoHeader {}
statefull({
    addingItem: TodoItemAdding,
    assign: assignAdding
})(TodoHeaderInj)


export default class TodoAppPage extends TodoWidget {}
statefull({
    TodoElement: TodoElementInj,
    TodoHeader: TodoHeaderInj,
    props: TodoAppPageFacet
})(TodoAppPage)
