// @flow

import type {RouteConfig} from 'modern-router'
import {AbstractStorage} from 'rdi-helpers'
import BrowserLocalStorage from 'rdi-helpers/storages/BrowserLocalStorage'

import {rdi as todoRdi, pages as todosPages, routes as todosRoutes} from 'rdi-todo/todoBundle'

export const rdi: mixed[] = [
    ...todoRdi,
    [AbstractStorage, BrowserLocalStorage]
]

export const pages: {[id: string]: Function} = {
    ...todosPages
}

export const routes: {[id: string]: RouteConfig} = {
    ...todosRoutes
}
