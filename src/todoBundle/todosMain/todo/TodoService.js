// @flow

import type {ResultOf} from 'reactive-di'
import {getSrc, copy} from 'reactive-di'
import {actions} from 'reactive-di/annotations'

import {createFetch} from 'rdi-fetcher'

import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import TodoValidator from 'rdi-todo/todoBundle/common/TodoValidator'

import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'
import TodoRefs from './TodoRefs'

function focusElement(et: HTMLElement): void {
    et.focus()
}

@actions
export default class TodoService {
    _options: TodoOptions
    _editableTodo: EditableTodo
    _todo: Todo
    _todos: TodoCollection
    _validator: TodoValidator
    _fetch: ResultOf<typeof createFetch>
    _refs: TodoRefs

    constructor(
        options: TodoOptions,
        editableTodo: EditableTodo,
        todos: TodoCollection,
        validator: TodoValidator,
        fetch: ResultOf<typeof createFetch>,
        refs: TodoRefs
    ) {
        this._options = options
        this._editableTodo = editableTodo
        this._todos = todos
        this._validator = validator
        this._fetch = fetch
        this._refs = refs
    }

    setTodo(todo: Todo): void {
        this._todo = todo
    }

    toggleCompleted() {
        const {_todo: todo, _todos: todos} = this
        const fetch = this._fetch
        if (!todo) {
            throw new Error('todo not initialized')
        }

        const newTodo = copy(todo, {isCompleted: !todo.isCompleted})

        getSrc(this._editableTodo).update({
            run(): Promise<TodoCollection> {
                return fetch(`/todo/${todo.id}`, {
                    method: 'POST',
                    body: newTodo
                }).then(() => todos)
            }
        })
        todos.set(newTodo)
    }

    beginEdit() {
        if (!this._todo) {
            throw new Error('todo not initialized')
        }
        getSrc(this._editableTodo).merge(this._todo)
        getSrc(this._options).merge({isEditing: true})
        this._refs.editingTitle.then(focusElement)
    }

    commitEdit() {
        const {_todo: todo, _todos: todos, _validator: validator,
            _editableTodo: editableTodo, _options: options} = this
        const fetch = this._fetch
        if (!todo) {
            throw new Error('todo not initialized')
        }
        const errors = validator.validate(editableTodo)
        if (!errors.isError) {
            const newTodo = copy(new Todo(), editableTodo)
            todos.set(todo, newTodo)
            getSrc(options).reset()
            getSrc(this._editableTodo).update({
                run(): Promise<TodoCollection> {
                    return fetch(`/todo/${todo.id}`, {
                        method: 'POST',
                        body: newTodo
                    }).then(() => todos)
                }
            })
        }
    }

    cancelEdit() {
        getSrc(this._options).merge({isEditing: false})
    }

    deleteTodo() {
        const {_todo: todo, _todos: todos} = this
        const fetch = this._fetch
        if (!todo) {
            throw new Error('todo not initialized')
        }

        getSrc(this._editableTodo).update({
            run(): Promise<TodoCollection> {
                return fetch(`/todo/${todo.id}`, {
                    method: 'DELETE'
                }).then(() => todos)
            }
        })
        todos.remove(todo)
    }
}
