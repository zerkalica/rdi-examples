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

@actions
export default class TodoService {
    _options: TodoOptions
    _editableTodo: EditableTodo
    _todo: Todo
    _todos: TodoCollection
    _validator: TodoValidator
    _fetch: ResultOf<typeof createFetch>

    constructor(
        options: TodoOptions,
        editableTodo: EditableTodo,
        todos: TodoCollection,
        validator: TodoValidator,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._options = options
        this._editableTodo = editableTodo
        this._todos = todos
        this._validator = validator
        this._fetch = fetch
    }

    setTodo(todo: Todo): void {
        this._todo = todo
    }

    setTitle(title: string) {
        this._editableTodo.set({title})
    }

    toggleCompleted() {
        const {_todo: todo, _todos: todos} = this
        if (!todo) {
            throw new Error('todo not initialized')
        }

        const newTodo = todo.copy({isCompleted: !todo.isCompleted})

        const updater = new Updater({
            value: todos,
            promise(): Promise<void> {
                return this._fetch('/todo', {
                    method: 'PUT',
                    body: newTodo
                })
            },
            complete({id}: {id: string}) {
                todos
                    .set(newTodo, newTodo.copy({id}))
                    .commit()
            }
        })
        updater.run()
        todos
            .set(todo, newTodo)
            .commit()
    }

    beginEdit() {
        if (!this._todo) {
            throw new Error('todo not initialized')
        }
        this._editableTodo.set(this._todo)
        this._validator.validate(this._todo).commit()
        this._options.set({isEditing: true})
    }

    commitEdit() {
        const {_todo: todo, _todos: todos, _validator: validator,
            _editableTodo: editableTodo, _options: options} = this
        if (!todo) {
            throw new Error('todo not initialized')
        }
        const errors = validator.validate(this._editableTodo)
        errors.commit()
        if (!errors.isError) {
            const newTodo = new Todo(editableTodo)
            todos.set(todo.id, newTodo).commit()
            options.set({isEditing: false})

            const updater = new Updater({
                value: todos,
                promise(): Promise<void> {
                    return this._fetch(`/todo/${todo.id}`, {
                        method: 'POST',
                        body: newTodo
                    }).then(() => {})
                },
                complete({id}: {id: string}) {
                    todos
                        .set(newTodo, newTodo.copy({id}))
                        .commit()
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
        if (!todo) {
            throw new Error('todo not initialized')
        }

        const updater = new Updater({
            value: todos,
            promise(): Promise<void> {
                return this._fetch(`/todo/${todo.id}`, {
                    method: 'DELETE'
                })
            }
        })
        updater.run()
        todos
            .remove(todo)
            .commit()
    }
}
