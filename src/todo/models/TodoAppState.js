/* @flow */

import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import {assignModel} from 'reactive-di-todomvc/common/helpers'

type TodoAppStateRec = {
    editingItem?: TodoItemEditing;
    addingItem?: TodoItemAdding;
    items?: TodoItemCollection;
    groupState?: TodoGroupState;
}

export default class TodoAppState {
    editingItem: TodoItemEditing;
    addingItem: TodoItemAdding;
    items: TodoItemCollection;
    groupState: TodoGroupState;

    constructor(rec: TodoAppStateRec = {}) {
        this.groupState = assignModel(rec.groupState, TodoGroupState)
        this.items = assignModel(rec.items, TodoItemCollection)
        this.editingItem = assignModel(rec.editingItem, TodoItemEditing)
        this.addingItem = assignModel(rec.addingItem, TodoItemAdding)
    }
}
