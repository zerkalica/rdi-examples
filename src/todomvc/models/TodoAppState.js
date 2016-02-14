/* @flow */

import type {Collection} from 'reactive-di/interfaces/collectionInterfaces'

import rdi from '../../common/annotations'
import TodoGroupState from './TodoGroupState'
import TodoItemAdding from './TodoItemAdding'
import TodoItemCollection from './TodoItemCollection'
import TodoItemEditing from './TodoItemEditing'
import type {TodoItem} from '../interfaces'

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
