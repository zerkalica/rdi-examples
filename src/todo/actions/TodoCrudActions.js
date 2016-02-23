/* @flow */

import {merge} from 'reactive-di'
import type {Collection} from 'reactive-di/i/collection'
import type {AsyncResult} from 'reactive-di/i/plugins/setterInterfaces'
import rdi, {createId} from 'reactive-di-todomvc/common/annotations'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'
import TodoEditingActions from 'reactive-di-todomvc/todo/actions/TodoEditingActions'

function toggleAll(
    todoState: TodoAppState,
    fetcher: Fetcher,
    groupState: TodoGroupState
): [TodoAppState, Promise<TodoAppState>] {
    const isCompleted = !groupState.isAllCompleted
    const newTodoState = merge(todoState, {
        items: todoState.items.update(null, (item) => merge(item, {isCompleted})),
        groupState: merge(todoState.groupState, {isAllCompleted: isCompleted})
    });

    const promise: Promise<any> = fetcher.load('todos', {
        method: 'POST',
        json: {
            isCompleted
        }
    }).then(() => null);

    return [newTodoState, promise]
}

function clearCompleted(
    items: TodoItemCollection,
    fetcher: Fetcher
): [TodoItemCollection, Promise<null>] {
    const newItems = items.filter((item) => !item.isCompleted)
    const promise: Promise<null> = fetcher.load(`todos`, {
        method: 'DELETE',
        json: {
            isCompleted: true
        }
    }).then(() => null);

    return [newItems, promise]
}

function remove(
    items: TodoItemCollection,
    fetcher: Fetcher,
    id: string
): [TodoItemCollection, Promise<null>] {
    const newItems = items.remove(id)

    const promise: Promise<null> = fetcher.load(`todo/${id}`, {
        method: 'DELETE'
    }).then(() => null);

    return [newItems, promise]
}

function toggle(
    items: TodoItemCollection,
    fetcher: Fetcher,
    id: string
): [TodoItemCollection, Promise<null>] {
    const newItems = items.update(
        id,
        (item: TodoItem) => merge(item, {isCompleted: !item.isCompleted})
    )

    const promise: Promise<null> = fetcher.load(`todo/${id}`, {
        method: 'POST',
        json: newItems.get(id)
    })
    .then(() => null);

    return [newItems, promise]
}

function change(
    todoState: TodoAppState,
    fetcher: Fetcher,
    newItem: TodoItem
): [TodoAppState, Promise<null>] {
    const newState = merge(todoState, {
        items: todoState.items.set(newItem.id, newItem),
        editingItem: merge(todoState.editingItem, {id: ''})
    })
    const promise: Promise<null> = fetcher.load(`todo/${newItem.id}`, {
        method: 'POST',
        json: newItem
    })
    .then(() => null);

    return [newState, promise]
}

function add(
    todoState: TodoAppState,
    fetcher: Fetcher,
    cancelEditing: () => void,
    newItem: TodoItem
): [TodoAppState, Promise<TodoItemCollection>] {
    const ni = new TodoItemImpl({
        ...newItem,
        id: createId()
    })
    const newItems = todoState.items.add(ni)
    const newStore = merge(todoState, {
        items: newItems,
        addingItem: merge(todoState.addingItem, {title: ''})
    })

    const promise = fetcher.load('todo', {
        method: 'PUT',
        json: ni
    }).then(({id}: {id: string}) =>
        merge(newStore, {
            items: newItems.set(ni.id, merge(ni, {id}))
        })
    )

    return [newStore, promise]
}

export default {
    toggleAll: rdi.asyncsetter(TodoAppState, Fetcher, TodoGroupState)(toggleAll),
    clearCompleted: rdi.asyncsetter(TodoItemCollection, Fetcher)(clearCompleted),
    remove: rdi.asyncsetter(TodoItemCollection, Fetcher)(remove),
    toggle: rdi.asyncsetter(TodoItemCollection, Fetcher)(toggle),
    change: rdi.asyncsetter(TodoAppState, Fetcher)(change),
    add: rdi.asyncsetter(TodoAppState, Fetcher, TodoEditingActions.cancelEditing)(add)
}
