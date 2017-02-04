// @flow

import type {ResultOf} from 'reactive-di'
import {Updater} from 'reactive-di'
import {actions} from 'reactive-di/annotations'

import {createFetch} from 'rdi-fetcher'

import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import TodoValidator from 'rdi-todo/todoBundle/common/TodoValidator'

import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'
import TodoRefs from './TodoRefs'

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

        const newTodo = todo.copy({isCompleted: !todo.isCompleted})

        const updater = new Updater({
            value: this._editableTodo,
            promise(): Promise<void> {
                return fetch(`/todo/${todo.id}`, {
                    method: 'POST',
                    body: newTodo
                }).then(() => {})
            }
        })
        updater.run()
        todos.set(newTodo)
    }

    beginEdit() {
        if (!this._todo) {
            throw new Error('todo not initialized')
        }
        this._editableTodo.set(this._todo)
        this._options.set({isEditing: true})
        this._refs.editingTitle.then((et: HTMLElement) => et.focus())
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
            const newTodo = new Todo().copy(editableTodo)
            todos.set(todo, newTodo)
            options.reset()

            const updater = new Updater({
                value: editableTodo,
                promise(): Promise<void> {
                    return fetch(`/todo/${todo.id}`, {
                        method: 'POST',
                        body: newTodo
                    }).then(() => {})
                }
            })
            updater.run()
        }
    }

    cancelEdit() {
        this._options.set({isEditing: false})
    }

    deleteTodo() {
        const {_todo: todo, _todos: todos} = this
        const fetch = this._fetch
        if (!todo) {
            throw new Error('todo not initialized')
        }

        const updater = new Updater({
            value: todos,
            promise(): Promise<void> {
                return fetch(`/todo/${todo.id}`, {
                    method: 'DELETE'
                }).then(() => {})
            }
        })
        updater.run()
        todos.remove(todo)
    }
}
