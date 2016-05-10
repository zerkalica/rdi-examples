/* @flow */

import type {
    IsAllCompleted,
    TodoItemsFacet
} from 'reactive-di-todomvc/i/todoInterfaces'

import _ from 'babel-plugin-transform-metadata/_'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'

import type {Annotation} from 'reactive-di/i/coreInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

const deps: Array<Annotation> = [
    [(_: IsAllCompleted), isAllCompletedFacet],
    [(_: TodoItemsFacet), todoItemsFacet],
    TodoQueryArgs
];

export default deps
