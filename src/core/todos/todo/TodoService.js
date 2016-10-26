// @flow

import {Updater} from 'reactive-di'

import Todo from 'rdi-todo/core/models/Todo'
import TodoCollection from 'rdi-todo/core/models/TodoCollection'
import TodoValidator from 'rdi-todo/core/models/TodoValidator'

import TodoOptions from './TodoOptions'
import EditableTodo from './EditableTodo'

class TodoServiceUpdater extends Updater {}

export default class TodoService {
    _options: TodoOptions
    _updater: TodoServiceUpdater
    _editableTodo: EditableTodo
    _todo: ?Todo
    _todos: TodoCollection
    _validator: TodoValidator

    static Updater = TodoServiceUpdater

    constructor(
        options: TodoOptions,
        updater: TodoServiceUpdater,
        editableTodo: EditableTodo,
        todos: TodoCollection,
        validator: TodoValidator
    ) {
        this._options = options
        this._updater = updater
        this._editableTodo = editableTodo
        this._todos = todos
        this._validator = validator
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
        updater.set([
            todos.set(
                todo.id,
                todo.copy({isCompleted: !todo.isCompleted})
            )
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
            transaction.push(
                todos.set(
                    todo.id,
                    new Todo(editableTodo)
                )
            )
            transaction.push(
                options.copy({isEditing: false})
            )
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
        updater.set([
            todos.remove(todo.id)
        ])
    }
}
