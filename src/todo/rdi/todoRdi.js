/* @flow */

import _ from 'babel-plugin-transform-metadata/_'

import todoActionsRdi from 'reactive-di-todomvc/todo/rdi/todoActionsRdi'
import todoModelsRdi from 'reactive-di-todomvc/todo/rdi/todoModelsRdi'

import type {
    ITodoPage
} from 'reactive-di-todomvc/todo/i'

import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'

export default [
    [(_: ITodoPage), TodoPage]
].concat(
    todoActionsRdi,
    todoModelsRdi
)
