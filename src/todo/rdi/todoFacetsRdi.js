/* @flow */

import {factory} from 'reactive-di/dist/annotations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoGroupState from 'reactive-di-todomvc/todo/models/TodoGroupState'
import LoadableTodoItemCollection from 'reactive-di-todomvc/todo/loaders/LoadableTodoItemCollection'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'

const deps: Array<Annotation> = [
    factory(todoItemsFacet, LoadableTodoItemCollection, TodoGroupState),
    factory(isAllCompletedFacet, LoadableTodoItemCollection)
];

export default deps
