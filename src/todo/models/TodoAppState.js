/* @flow */

import type {Collection} from 'reactive-di/i/collection'

import rdi from 'reactive-di-todomvc/common/annotations'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoAppStateRec = {
    editing?: TodoItem;
    adding?: TodoItem;
    items?: Collection<TodoItem>;
    groupState?: TodoGroupState;
}

class TodoAppState {
    editingItem: TodoItem;
    addingItem: TodoItem;
    items: Collection<TodoItem>;
    groupState: TodoGroupState;

    constructor(rec: TodoAppStateRec = {}) {
        this.groupState = rec.groupState || new TodoGroupState()
        this.items = rec.items || new TodoItemCollection()
        this.editingItem = rec.editingItem || new TodoItemEditing()
        this.addingItem = rec.addingItem || new TodoItemAdding()
    }
}

export default rdi.model(TodoAppState)
