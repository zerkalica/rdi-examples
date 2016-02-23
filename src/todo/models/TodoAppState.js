/* @flow */

import type {Collection} from 'reactive-di/i/collection'

import rdi from 'reactive-di-todomvc/common/annotations'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import {assignModel} from 'reactive-di-todomvc/common/helpers'

type TodoAppStateRec = {
    editingItem?: TodoItem;
    addingItem?: TodoItem;
    items?: Collection<TodoItem>;
    groupState?: TodoGroupState;
}

class TodoAppState {
    editingItem: TodoItem;
    addingItem: TodoItem;
    items: Collection<TodoItem>;
    groupState: TodoGroupState;

    constructor(rec: TodoAppStateRec = {}) {
        this.groupState = assignModel(rec.groupState, TodoGroupState)
        this.items = assignModel(rec.items, TodoItemCollection)
        this.editingItem = assignModel(rec.editingItem, TodoItemEditing)
        this.addingItem = assignModel(rec.addingItem, TodoItemAdding)
    }
}

export default rdi.model(TodoAppState)
