/* @flow */
import todoComponentsRdi from 'reactive-di-todomvc/todo/rdi/todoComponentsRdi'
import todoActionsRdi from 'reactive-di-todomvc/todo/rdi/todoActionsRdi'
import todoModelsRdi from 'reactive-di-todomvc/todo/rdi/todoModelsRdi'
import todoFacetsRdi from 'reactive-di-todomvc/todo/rdi/todoFacetsRdi'

export default [].concat(
    todoComponentsRdi,
    todoActionsRdi,
    todoModelsRdi,
    todoFacetsRdi
)
