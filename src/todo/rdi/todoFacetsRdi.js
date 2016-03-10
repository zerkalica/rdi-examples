/* @flow */

import {factory, klass} from 'reactive-di/dist/annotations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import LoadableTodoItemCollection from 'reactive-di-todomvc/todo/loaders/LoadableTodoItemCollection'

import type {Annotation} from 'reactive-di/i/annotationInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'
import LoadableBaseQuery from 'reactive-di-todomvc/common/loaders/LoadableBaseQuery'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Annotation> = [
    factory(todoItemsFacet, LoadableTodoItemCollection, TodoQueryArgs),
    factory(isAllCompletedFacet, LoadableTodoItemCollection),
    klass(TodoQueryArgs, LoadableBaseQuery, tr)
];

export default deps
