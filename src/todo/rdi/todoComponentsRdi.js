/* @flow */
import type {Dependency} from 'reactive-di/i/coreInterfaces'

import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'

import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

const deps: Array<Dependency> = [
    TodoHeader,
    TodoFooter,
    TodoElement,
    TodoElementList,
    TodoMain,
    TodoPageLoadingState,
    TodoPageLoadingStateMeta,
    TodoPage
];

export default deps
