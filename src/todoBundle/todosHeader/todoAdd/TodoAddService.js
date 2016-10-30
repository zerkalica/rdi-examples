// @flow
import {service} from 'reactive-di/annotations'
import type {ResultOf} from 'reactive-di'
import {Updater} from 'reactive-di'
import TodoValidator from 'rdi-todo/todoBundle/common/TodoValidator'
import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoGroupState from 'rdi-todo/todoBundle/common/TodoGroupState'
import TodosUpdater from 'rdi-todo/todoBundle/common/TodosUpdater'
import {createFetch} from 'rdi-fetcher'
import TodoAddValues from './TodoAddValues'

@service
export default class TodoAddService {
    _values: TodoAddValues
    _updater: Updater
    _validator: TodoValidator
    _todos: TodoCollection
    _gs: TodoGroupState
    _fetch: ResultOf<typeof createFetch>

    constructor(
        values: TodoAddValues,
        updater: TodosUpdater,
        validator: TodoValidator,
        todos: TodoCollection,
        gs: TodoGroupState,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._values = values
        this._updater = updater
        this._validator = validator
        this._todos = todos
        this._gs = gs
        this._fetch = fetch
    }

    setTitle = (title: string) => {
        this._updater.set([this._values.copy({title})])
    }

    commitAdding = () => {
        const errors = this._validator.validate(this._values)
        const transaction = [errors]
        if (!errors.isError) {
            const newTodo = new Todo(this._values)
            transaction.push(this._todos.add(newTodo))
            transaction.push(new TodoAddValues())
            const submitAddTodo = () => this._fetch('/todo', {
                method: 'PUT',
                body: newTodo
            }).then(({id}: {id: string}) => ([
                this._todos.set(newTodo.id, newTodo.copy({id}))
            ]))
            transaction.push(submitAddTodo)
        }
        this._updater.set(transaction)
    }

    cancelAdding = () => {
        this._updater.set([
            this._values.copy({title: ''})
        ])
    }

    toggleAll = () => {
        const groupState = this._gs
        const todos = this._todos
        const isCompleted = !groupState.isAllCompleted

        const submitToggleAll = () => this._fetch('/todos', {
            method: 'POST',
            body: {
                isCompleted
            }
        }).then(() => {})

        this._updater.set([
            todos.update(null, (todo: Todo) => todo.copy({isCompleted})),
            new TodoGroupState({isAllCompleted: isCompleted}),
            submitToggleAll
        ])
    }
}
