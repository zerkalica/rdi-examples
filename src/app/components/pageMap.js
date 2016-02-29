/* @flow */

import TodoMainPage from 'reactive-di-todomvc/todo/components/TodoMainPage'
import NotFoundPage from 'reactive-di-todomvc/common/components/NotFoundPage'
import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

const DefaultPage = TodoMainPage

const pageMap: PageMap = {
    NotFoundPage,
    DefaultPage,

    TodoMainPage
};

export default pageMap
