/* @flow */

import {merge} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection'

import rdi, {createId} from 'reactive-di-todomvc/common/annotations'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

function toggleAll(todoState: TodoAppState, groupState: TodoGroupState): Collection<TodoItem> {
    const isCompleted = !groupState.isAllCompleted
    return merge(todoState, {
        items: todoState.items.map((item) => merge(item, {isCompleted})),
        groupState: merge(todoState.groupState, {isAllCompleted: isCompleted})
    })
}

function clearCompleted(items: TodoItemCollection): Collection<TodoItem> {
    return items.filter((item) => !item.isCompleted)
}

function remove(items: TodoItemCollection, id: string): Collection<TodoItem> {
    return items.remove(id)
}

function toggle(items: TodoItemCollection, id: string): Collection<TodoItem> {
    return items.update(
        id,
        (item: TodoItem) => merge(item, {isCompleted: !item.isCompleted})
    )
}

function change(todoState: TodoAppState, newItem: TodoItem): Collection<TodoItem> {
    return merge(todoState, {
        items: todoState.items.set(newItem.id, newItem),
        editingItem: merge(todoState.editingItem, {id: ''})
    })
}

function add(todoState: TodoAppState, newItem: TodoItem): Collection<TodoItem> {
    return merge(todoState, {
        items: todoState.items.add(new TodoItemImpl({
            ...newItem,
            id: createId()
        })),
        addingItem: merge(todoState.editingItem, {title: ''})
    })
}

export default {
    toggleAll: rdi.setter(TodoAppState, TodoGroupState)(toggleAll),
    clearCompleted: rdi.setter(TodoItemCollection)(clearCompleted),
    remove: rdi.setter(TodoItemCollection)(remove),
    toggle: rdi.setter(TodoItemCollection)(toggle),
    change: rdi.setter(TodoAppState)(change),
    add: rdi.setter(TodoAppState)(add)
}
