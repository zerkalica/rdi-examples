// @flow
import {actions} from 'reactive-di/annotations'
import type {ResultOf} from 'reactive-di'
import {Updater} from 'reactive-di'
import TodoValidator from 'rdi-todo/todoBundle/common/TodoValidator'
import TodoCollection from 'rdi-todo/todoBundle/common/TodoCollection'
import Todo from 'rdi-todo/todoBundle/common/Todo'
import TodoGroupState from 'rdi-todo/todoBundle/common/TodoGroupState'
import {createFetch} from 'rdi-fetcher'
import TodoAddValues from './TodoAddValues'

@actions
export default class TodoAddService {
    _values: TodoAddValues
    _validator: TodoValidator
    _todos: TodoCollection
    _gs: TodoGroupState
    _fetch: ResultOf<typeof createFetch>

    constructor(
        values: TodoAddValues,
        validator: TodoValidator,
        todos: TodoCollection,
        gs: TodoGroupState,
        fetch: ResultOf<typeof createFetch>
    ) {
        this._values = values
        this._validator = validator
        this._todos = todos
        this._gs = gs
        this._fetch = fetch
    }

    setTitle(title: string) {
        this._values.set({title})
    }

    commitAdding() {
        const todos = this._todos
        const errors = this._validator.validate(this._values)
        if (!errors.isError) {
            const newTodo = new Todo(this._values)
            todos.push(newTodo)

            const updater = new Updater({
                value: todos,
                promise(): Promise<void> {
                    return this._fetch('/todo', {
                        method: 'PUT',
                        body: newTodo
                    })
                },
                complete({id}: {id: string}) {
                    todos.set(newTodo, newTodo.copy({id}))
                }
            })
            updater.run()
        }
    }

    cancelAdding() {
        this._values.reset()
    }

    toggleAll() {
        const groupState = this._gs
        const todos = this._todos
        const isCompleted = !groupState.isAllCompleted

        const updater = new Updater({
            value: todos,
            promise(): Promise<void> {
                return this._fetch('/todos', {
                    method: 'POST',
                    body: {
                        isCompleted
                    }
                }).then(() => {})
            }
        })
        todos.updateAll((todo: Todo) => todo.copy({isCompleted}))
        groupState.set({isAllCompleted: isCompleted})

        updater.run()
    }
}
