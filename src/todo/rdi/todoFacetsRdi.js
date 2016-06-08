/* @flow */

import type {ConfigItem} from 'reactive-di'
import type {
    TodoItemsFacet,
    IsAllCompleted
} from 'reactive-di-todomvc/todo/i'

import _ from 'babel-plugin-transform-metadata/_'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

const deps: Array<ConfigItem> = [
    [(_: TodoItemsFacet), todoItemsFacet],
    [(_: IsAllCompleted), isAllCompletedFacet],
    TodoQueryArgs
];

export default deps
