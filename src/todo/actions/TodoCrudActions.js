/* @flow */

import {merge} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection'
import type {AsyncResult} from 'reactive-di/i/plugins/setterInterfaces'
import rdi, {createId} from 'reactive-di-todomvc/common/annotations'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import {promiseToObservable} from 'reactive-di'

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import TodoEditingActions from 'reactive-di-todomvc/todo/actions/TodoEditingActions'

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

function toggle(
    items: TodoItemCollection,
    fetcher: Fetcher,
    id: string
): AsyncResult<TodoItem, void> {
    const newItems = items.update(
        id,
        (item: TodoItem) => merge(item, {isCompleted: !item.isCompleted})
    )

    const promise: Promise<TodoItemCollection> = fetcher.load(`todo/${id}`, {
        method: 'POST',
        json: items.get(id)
    })
    .then(() => newItems);

    return [newItems, promise]
}

function change(todoState: TodoAppState, newItem: TodoItem): Collection<TodoItem> {
    return merge(todoState, {
        items: todoState.items.set(newItem.id, newItem),
        editingItem: merge(todoState.editingItem, {id: ''})
    })
}

function add(
    todoState: TodoAppState,
    fetcher: Fetcher,
    cancelEditing: () => void,
    newItem: TodoItem
): TodoAppState {
    return merge(todoState, {
        items: todoState.items.add(new TodoItemImpl({
            ...newItem,
            id: createId()
        })),
        addingItem: merge(todoState.editingItem, {title: ''})
    })
}

export default {
    toggleAll: rdi.syncsetter(TodoAppState, TodoGroupState)(toggleAll),
    clearCompleted: rdi.syncsetter(TodoItemCollection)(clearCompleted),
    remove: rdi.syncsetter(TodoItemCollection)(remove),
    toggle: rdi.asyncsetter(TodoItemCollection, Fetcher)(toggle),
    change: rdi.syncsetter(TodoAppState)(change),
    add: rdi.syncsetter(TodoAppState, Fetcher, TodoEditingActions.cancelEditing)(add)
}
