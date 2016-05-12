/* @flow */

import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import type {PageMap} from 'modern-router'

export {ErrorPage}

export const pages: PageMap = {
    TodoPage
};
