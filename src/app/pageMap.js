/* @flow */

import type {ITodoPage} from 'reactive-di-todomvc/todo'
import type {IErrorPage} from 'reactive-di-todomvc/common'
import type {PageMap} from 'modern-router'
import _ from 'babel-plugin-transform-metadata/_'

const ErrorPage: IErrorPage = (_: IErrorPage);

export {ErrorPage}

export const pages: PageMap = {
    TodoPage: (_: ITodoPage)
};
