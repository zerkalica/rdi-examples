// @flow
import {Updater} from 'reactive-di'
import TodoValidator from 'rdi-todo/core/models/TodoValidator'
import TodoCollection from 'rdi-todo/core/models/TodoCollection'
import Todo from 'rdi-todo/core/models/Todo'

import TodoAddValues from './TodoAddValues'

export class TodoAddServiceUpdater extends Updater {}

export default class TodoAddService {
    _values: TodoAddValues
    _updater: Updater
    _validator: TodoValidator
    _todos: TodoCollection

    static Updater = TodoAddServiceUpdater

    constructor(
        values: TodoAddValues,
        updater: TodoAddServiceUpdater,
        validator: TodoValidator,
        todos: TodoCollection
    ) {
        this._values = values
        this._updater = updater
        this._validator = validator
        this._todos = todos
    }

    setTitle = (title: string) => {
        this._updater.set([this._values.copy({title})])
    }

    commitAdding = () => {
        const errors = this._validator.validate(this._values)
        const transaction = [errors]
        if (!errors.isError) {
            transaction.push(this._todos.add(new Todo(this._values)))
            transaction.push(
                this._values.copy({title: ''})
            )
        }
        this._updater.set(transaction)
    }

    cancelAdding = () => {
        this._updater.set([
            this._values.copy({title: ''})
        ])
    }
}
