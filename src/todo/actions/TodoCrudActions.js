/* @flow */

import {merge} from 'reactive-di'
import {createId} from 'reactive-di-todomvc/common/annotations'
import TodoAppState from 'reactive-di-todomvc/todo/models/TodoAppState'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'

import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

export function toggleAll(
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

export function clearCompleted(
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

export function removeTodoItem(
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

export function toggleTodoItem(
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

export function commitEditing(
    todoState: TodoAppState,
    fetcher: Fetcher,

    newItem: TodoItem
): [TodoAppState, Promise<null>] {
    const newState = merge(todoState, {
        items: todoState.items.set(newItem.id, newItem),
        editingItem: merge(todoState.editingItem, {
            isEditing: false
        })
    })
    const promise: Promise<null> = fetcher.load(`todo/${newItem.id}`, {
        method: 'POST',
        json: newItem
    })
    .then(() => null);

    return [newState, promise]
}

export function commitAdding(
    todoState: TodoAppState,
    fetcher: Fetcher,

    newItem: TodoItem
): [TodoAppState, Promise<TodoItemCollection>] {
    const ni = new TodoItemImpl({
        ...newItem,
        id: createId()
    })
    const newItems = todoState.items.add(ni)
    const newStore = merge(todoState, {
        items: newItems,
        addingItem: merge(todoState.addingItem, {
            item: merge(todoState.addingItem.item, {
                title: ''
            })
        })
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
