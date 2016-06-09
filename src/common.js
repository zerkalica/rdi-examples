/* @flow */
import 'babel-polyfill'

import _ from 'babel-plugin-transform-metadata/_'

import type {
    ConfigItem
} from 'reactive-di'

import type {ITodoPage} from 'reactive-di-todomvc/todo/i'
import type {IErrorPage} from 'reactive-di-todomvc/common/i'
import type {PageMap} from 'modern-router'

import todoRdi from 'reactive-di-todomvc/todo/rdi/todoRdi'
import commonRdi from 'reactive-di-todomvc/common/rdi/commonRdi'
import debugRdi from 'reactive-di-todomvc/mockServer/rdi/debugRdi'
import authRdi from 'reactive-di-todomvc/auth/rdi/authRdi'

const ErrorPage: mixed = (_: IErrorPage);
export {ErrorPage}

export const pages: PageMap = {
    TodoPage: (_: ITodoPage)
};

export const appDeps: Array<ConfigItem> = [].concat(
    todoRdi,
    commonRdi,
    debugRdi,
    authRdi
);
