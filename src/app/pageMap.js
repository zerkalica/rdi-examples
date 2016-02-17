/* @flow */

import TodoAppPage from 'reactive-di-todomvc/todo/pages/TodoAppPage'
import PageNotFoundPage from 'reactive-di-todomvc/common/components/PageNotFoundPage'
import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

const pageMap: PageMap = {
    PageNotFoundPage,
    TodoAppPage
};

export default pageMap
