/* @flow */

import type {ConfigItem} from 'reactive-di'
import type {
    TodoItemsFacet,
    IsAllCompleted
} from 'reactive-di-todomvc/todo'

import _ from 'babel-plugin-transform-metadata/_'

import {factory, klass} from 'reactive-di/configurations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

const deps: Array<ConfigItem> = [
    [(_: TodoItemsFacet), factory(todoItemsFacet)],
    [(_: IsAllCompleted), factory(isAllCompletedFacet)],
    klass(TodoQueryArgs)
];

export default deps
