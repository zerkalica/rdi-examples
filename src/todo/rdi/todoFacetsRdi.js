/* @flow */
import type {
    TodoItemsFacet,
    IsAllCompleted
} from 'reactive-di-todomvc/i/todoInterfaces'
import _ from 'babel-plugin-transform-metadata/_'

import {factory, klass} from 'reactive-di/configurations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import type {Annotation} from 'reactive-di/i/coreInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'

const deps: Array<Annotation> = [
    [(_: TodoItemsFacet), factory(todoItemsFacet)],
    [(_: IsAllCompleted), factory(isAllCompletedFacet)],
    klass(TodoQueryArgs)
];

export default deps
