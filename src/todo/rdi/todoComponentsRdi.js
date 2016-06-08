/* @flow */

import type {ConfigItem} from 'reactive-di'
import type {
    ITodoElement,
    ITodoHeader,
    ITodoMain,
    ITodoFooter,
    ITodoPageLoadingState,
    ITodoPage,
    ITodoElementList
} from 'reactive-di-todomvc/todo/i'

import _ from 'babel-plugin-transform-metadata/_'

import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoPageLoadingState from 'reactive-di-todomvc/todo/components/TodoPageLoadingState'
import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'

import TodoPageLoadingStateMeta from 'reactive-di-todomvc/todo/models/TodoPageLoadingStateMeta'

const deps: Array<ConfigItem> = [
    [(_: ITodoHeader), TodoHeader],
    [(_: ITodoFooter), TodoFooter],
    [(_: ITodoElement), TodoElement],
    [(_: ITodoElementList), TodoElementList],
    [(_: ITodoMain), TodoMain],
    [(_: ITodoPageLoadingState), TodoPageLoadingState],
    [(_: ITodoPage), TodoPage],
    TodoPageLoadingStateMeta
];

export default deps
