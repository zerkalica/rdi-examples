/* @flow */

import type {
    AuthFetch
} from 'reactive-di-todomvc/auth/i'

import m from 'reactive-di-todomvc/common/helpers/merge'
import createId from 'reactive-di-todomvc/common/helpers/createId'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import TodoItemCollection, {
    TodoItemImpl
} from 'reactive-di-todomvc/todo/models/TodoItemCollection'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'

import type {TodoItem} from 'reactive-di-todomvc/todo/i'
import type {Operation} from 'reactive-di-observable'

import {setter} from 'reactive-di-observable/annotations'

function empty(): Array<Operation> {
    return []
}

export function toggleAll(
    todos: TodoItemCollection,
    groupState: TodoGroupState,
    fetch: AuthFetch
): Array<Operation> {
    const isCompleted = !groupState.isAllCompleted
    return [
        {object: todos.update(null, (item) => m(item, {isCompleted}))},
        {object: m(groupState, {isAllCompleted: isCompleted})},
        {
            promise: () => fetch('todos', {
                method: 'POST',
                json: {
                    isCompleted
                }
            }).then(empty)
        }
    ]
}
setter()(toggleAll)

export function clearCompleted(
    items: TodoItemCollection,
    fetch: AuthFetch
): Array<Operation> {
    return [
        {object: items.filter((item) => !item.isCompleted)},
        {
            promise: () => fetch(`todos`, {
                method: 'DELETE',
                json: {
                    isCompleted: true
                }
            }).then(empty)
        }
    ]
}
setter()(clearCompleted)

export function removeTodoItem(
    items: TodoItemCollection,
    fetch: AuthFetch,
    /* @args */ id: string
): Array<Operation> {
    return [
        {object: items.remove(id)},
        {
            promise: () => fetch(`todo/${id}`, {
                method: 'DELETE'
            }).then(empty)
        }
    ]
}
setter()(removeTodoItem)

export function toggleTodoItem(
    items: TodoItemCollection,
    fetch: AuthFetch,
    /* @args */ id: string
): Array<Operation> {
    const newItems = items.update(
        id,
        (item: TodoItem) => m(item, {isCompleted: !item.isCompleted})
    );

    return [
        {object: newItems},
        {
            promise: () => fetch(`todo/${id}`, {
                method: 'POST',
                json: newItems.get(id)
            })
            .then(empty)
        }
    ]
}
setter()(toggleTodoItem)

type Errors = {
    isError: boolean,
    errors: {[id: string]: string}
}

function getTodoItemAddingErrors(newItem: TodoItem): Errors {
    const errors: {[id: string]: string} = {}
    if (!newItem.title) {
        errors.title = 'Need todo title'
    }

    return {
        isError: !newItem.title,
        errors
    }
}

export function commitEditing(
    todos: TodoItemCollection,
    todoItemEditing: TodoItemEditing,
    fetch: AuthFetch,
    /* @args */ newItem: TodoItem
): Array<Operation> {
    const {isError, errors} = getTodoItemAddingErrors(newItem)
    if (isError) {
        return [
            {object: m(todoItemEditing, {errors})}
        ]
    }

    return [
        {
            object: todos.set(newItem.id, newItem)
        },
        {
            object: m(todoItemEditing, {
                isEditing: false,
                errors
            })
        },
        {
            promise: () => fetch(`todo/${newItem.id}`, {
                method: 'POST',
                json: newItem
            })
            .then(empty)
        }
    ]
}
setter()(commitEditing)

export function commitAdding(
    todos: TodoItemCollection,
    todoItemAdding: TodoItemAdding,
    fetch: AuthFetch,
    /* @args */ newItem: TodoItem
): Array<Operation> {
    const ni = new TodoItemImpl({
        ...newItem,
        id: createId()
    })
    const {isError, errors} = getTodoItemAddingErrors(newItem)
    if (isError) {
        return [
            {object: m(todoItemAdding, {errors})}
        ]
    }

    const newItems = todos.add(ni)
    const transaction: Array<Operation> = [
        {object: newItems},
        {
            object: m(todoItemAdding, {
                errors,
                item: m(todoItemAdding.item, {
                    title: ''
                })
            })
        }
    ];

    if (!isError) {
        transaction.push({
            promise: () => fetch('todo', {
                method: 'PUT',
                json: ni
            }).then(({id}) => ([
                {object: newItems.set(ni.id, m(ni, {id}))}
            ]))
        })
    }

    return transaction
}
setter()(commitAdding)
