/* @flow */

import rdi from '../../common/annotations'
import {merge} from 'reactive-di'
import type {Collection} from 'reactive-di/interfaces/collectionInterfaces'
import type {TodoItem} from '../interfaces'
import TodoGroupState from '../models/TodoGroupState'
import TodoItemCollection from '../models/TodoItemCollection'
import TodoAppState from '../models/TodoAppState'

export function toggleAll(items: TodoItemCollection, groupState: TodoGroupState): Collection<TodoItem> {
    const isCompleted = !groupState.isAllCompleted
    return items.map(item => merge(item, {isCompleted}))
}
rdi.setter(TodoItemCollection, TodoGroupState)(toggleAll)

export function clearCompleted(items: TodoItemCollection): Collection<TodoItem> {
    return items.filter(item => item.isCompleted)
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
        items: todoState.items.add(newItem),
        addingItem: merge(todoState.editingItem, {id: '', title: ''})
    })
}
rdi.setter(TodoAppState)(add)
