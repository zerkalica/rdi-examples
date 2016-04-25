/* @flow */

import {factory, klass} from 'reactive-di-observable/configurations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import type {Annotation} from 'reactive-di/i/coreInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'
import LoadableBaseQuery from 'reactive-di-todomvc/common/loaders/LoadableBaseQuery'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Annotation> = [
    factory(todoItemsFacet, TodoItemCollection, TodoQueryArgs),
    factory(isAllCompletedFacet, TodoItemCollection),
    klass(TodoQueryArgs, LoadableBaseQuery, tr)
];

export default deps
