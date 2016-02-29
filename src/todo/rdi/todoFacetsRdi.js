/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import LoadableTodoItemCollection from 'reactive-di-todomvc/todo/loaders/LoadableTodoItemCollection'

import type {AnyAnnotation} from 'reactive-di/i/annotationInterfaces'

const {factory} = rdi
const deps: Array<AnyAnnotation> = [
    factory(todoItemsFacet, LoadableTodoItemCollection, TodoGroupState),
    factory(isAllCompletedFacet, LoadableTodoItemCollection)
];

export default deps
