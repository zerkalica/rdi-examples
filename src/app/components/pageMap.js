/* @flow */

import TodoPage from 'reactive-di-todomvc/todo/components/TodoPage'
import NotFoundPage from 'reactive-di-todomvc/common/components/NotFoundPage'
import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

const pageMap: PageMap = {
    NotFoundPage,

    TodoPage
};

export default pageMap
