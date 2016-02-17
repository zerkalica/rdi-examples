/* @flow */

import {merge} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection'

import rdi, {createId} from 'reactive-di-todomvc/common/annotations'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

export function toggleAll(
    todoState: TodoAppState,
    groupState: TodoGroupState
): Collection<TodoItem> {
    const isCompleted = !groupState.isAllCompleted
    return merge(todoState, {
        items: todoState.items.map((item) => merge(item, {isCompleted})),
        groupState: merge(todoState.groupState, {isAllCompleted: isCompleted})
    })
}
rdi.setter(TodoAppState, TodoGroupState)(toggleAll)

export function clearCompleted(items: TodoItemCollection): Collection<TodoItem> {
    return items.filter((item) => !item.isCompleted)
}
rdi.setter(TodoItemCollection)(clearCompleted)

export function remove(items: TodoItemCollection, id: string): Collection<TodoItem> {
    return items.remove(id)
}
rdi.setter(TodoItemCollection)(remove)

export function toggle(items: TodoItemCollection, id: string): Collection<TodoItem> {
    return items.update(
        id,
        (item: TodoItem) => merge(item, {isCompleted: !item.isCompleted})
    )
}
rdi.setter(TodoItemCollection)(toggle)

export function change(todoState: TodoAppState, newItem: TodoItem): Collection<TodoItem> {
    return merge(todoState, {
        items: todoState.items.set(newItem.id, newItem),
        editingItem: merge(todoState.editingItem, {id: ''})
    })
}
rdi.setter(TodoAppState)(change)

export function add(todoState: TodoAppState, newItem: TodoItem): Collection<TodoItem> {
    return merge(todoState, {
        items: todoState.items.add(new TodoItemImpl({
            ...newItem,
            id: createId()
        })),
        addingItem: merge(todoState.editingItem, {title: ''})
    })
}
rdi.setter(TodoAppState)(add)
