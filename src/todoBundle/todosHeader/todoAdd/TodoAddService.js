// @flow
import {actions} from 'reactive-di/annotations'
import type {ResultOf} from 'reactive-di'
import {copy, getSrc} from 'reactive-di'
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
        getSrc(this._values).merge({title})
    }

    commitAdding() {
        const todos = this._todos
        const errors = this._validator.validate(this._values)
        const fetch = this._fetch
        if (!errors.isError) {
            const newTodo = copy(new Todo(), this._values)
            getSrc(todos).update({
                run(): Promise<{id: string}> {
                    return fetch('/todo', {
                        method: 'PUT',
                        body: newTodo
                    })
                },
                complete({id}: {id: string}) {
                    todos.set(copy(newTodo, {id}))
                }
            })
            todos.push(newTodo)
            getSrc(this._values).reset()
        }
    }

    cancelAdding() {
        getSrc(this._values).reset()
    }

    toggleAll() {
        const groupState = this._gs
        const todos = this._todos
        const isCompleted = !groupState.isAllCompleted
        const fetch = this._fetch
        getSrc(todos).update({
            run(): Promise<null> {
                return fetch('/todos', {
                    method: 'POST',
                    body: {
                        isCompleted
                    }
                }).then(() => null)
            }
        })
        todos.updateAll((todo: Todo) => copy(todo, {isCompleted}))
        getSrc(groupState).merge({isAllCompleted: isCompleted})
    }
}
