/* @flow */

import {factory, klass} from 'reactive-di/configurations'

import isAllCompletedFacet from 'reactive-di-todomvc/todo/facets/isAllCompletedFacet'
import todoItemsFacet from 'reactive-di-todomvc/todo/facets/todoItemsFacet'
import TodoItemCollection from 'reactive-di-todomvc/todo/models/TodoItemCollection'

import type {Annotation} from 'reactive-di/i/coreInterfaces'
import TodoQueryArgs from 'reactive-di-todomvc/todo/facets/TodoQueryArgs'
import {Route} from 'modern-router'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Annotation> = [
    factory(todoItemsFacet, TodoItemCollection, TodoQueryArgs),
    factory(isAllCompletedFacet, TodoItemCollection),
    klass(TodoQueryArgs, Route, tr)
];

export default deps
