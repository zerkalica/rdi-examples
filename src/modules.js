// @flow

import type {RouteConfig} from 'modern-router'
import type {RegisterDepItem} from 'reactive-di'

import {pages as todosPages, routes as todosRoutes, rdi as todosRdi} from 'rdi-todo/core'
import {rdi as uiRdi} from 'rdi-ui-common'

export const pages: {[id: string]: Function} = {
    ...todosPages
}

export const routes: {[id: string]: RouteConfig} = {
    ...todosRoutes
}

const aliases = [
]

export const rdi: RegisterDepItem[] = aliases.concat(
    todosRdi,
    uiRdi
)
