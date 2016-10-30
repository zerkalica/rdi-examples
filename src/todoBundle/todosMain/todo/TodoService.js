// @flow
import type {ResultOf} from 'reactive-di'
import {Updater} from 'reactive-di'

import {createFetch} from 'rdi-fetcher'

import TodosUpdater from 'rdi-todo/todoBundle/common/TodosUpdater'
import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import TodoValidator from 'rdi-todo/todoBundle/common/TodoValidator'

import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'

export default class TodoService {
    _options: TodoOptions
    _updater: Updater
    _editableTodo: EditableTodo
    _todo: ?Todo
    _todos: TodoCollection
    _validator: TodoValidator
    _fetch: ResultOf<typeof createFetch>

    constructor(
        options: TodoOptions,
        updater: TodosUpdater,
        editableTodo: EditableTodo,
        todos: TodoCollection,
        validator: TodoValidator,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._options = options
        this._updater = updater
        this._editableTodo = editableTodo
        this._todos = todos
        this._validator = validator
        this._fetch = fetch
    }

    setTodo(todo: Todo): void {
        this._todo = todo
    }

    setTitle = (title: string) => {
        this._updater.set([
            this._editableTodo.copy({title})
        ])
    }

    toggleCompleted = () => {
        const {_updater: updater, _todo: todo, _todos: todos} = this
        if (!todo) {
            throw new Error('todo not initialized')
        }

        const newTodo = todo.copy({isCompleted: !todo.isCompleted})

        const completeSubmit = () => this._fetch(`/todo/${todo.id}`, {
            method: 'POST',
            body: newTodo
        }).then(() => {})

        updater.set([
            todos.set(todo.id, newTodo),
            completeSubmit
        ])
    }

    beginEdit = () => {
        if (!this._todo) {
            throw new Error('todo not initialized')
        }
        this._updater.set([
            new EditableTodo(this._todo),
            this._validator.validate(this._todo),
            this._options.copy({isEditing: true})
        ])
    }

    commitEdit = () => {
        const {_updater: updater, _todo: todo, _todos: todos, _validator: validator,
            _editableTodo: editableTodo, _options: options} = this
        if (!todo) {
            throw new Error('todo not initialized')
        }
        const errors = validator.validate(this._editableTodo)
        const transaction = [errors]
        if (!errors.isError) {
            const newTodo = new Todo(editableTodo)
            transaction.push(
                todos.set(
                    todo.id,
                    newTodo
                )
            )
            transaction.push(
                options.copy({isEditing: false})
            )
            const submitEditTodo = () => this._fetch(`/todo/${todo.id}`, {
                method: 'POST',
                body: newTodo
            }).then(() => {})
            transaction.push(submitEditTodo)
        }
        updater.set(transaction)
    }

    cancelEdit = () => {
        this._updater.set([
            this._options.copy({isEditing: false})
        ])
    }

    deleteTodo = () => {
        const {_updater: updater, _todo: todo, _todos: todos} = this
        if (!todo) {
            throw new Error('todo not initialized')
        }
        const removeSubmit = () => this._fetch(`/todo/${todo.id}`, {
            method: 'DELETE'
        })
        updater.set([
            todos.remove(todo.id),
            removeSubmit
        ])
    }
}
