// @flow

import type {RouteConfig} from 'modern-router'

import {pages as todosPages, routes as todosRoutes} from 'rdi-todo/todoBundle'

export const pages: {[id: string]: Function} = {
    ...todosPages
}

export const routes: {[id: string]: RouteConfig} = {
    ...todosRoutes
}
