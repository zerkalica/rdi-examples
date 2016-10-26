// @flow

import type {RegisterDepItem} from 'reactive-di'
import type {RouteConfig} from 'modern-router'
import {createFetch} from 'rdi-fetcher'
import {EmulatedApi, createEmulatedFetch} from 'rdi-api-emulator'
import createTodoEmulatedApi from './services/createTodoEmulatedApi'
import TodosPage from './TodosPage'

const rdi: RegisterDepItem[] = [
    [createFetch, createEmulatedFetch],
    [EmulatedApi, createTodoEmulatedApi]
]

const pages: {[id: string]: mixed} = {
    TodosPage
}

const routes: {[id: string]: RouteConfig} = {
    index: {
        page: 'TodosPage',
        pattern: '/',
        defaults: {
            group: 'all'
        }
    },
    TodosPage: {
        pattern: '/todos/<group>',
        defaults: {
            group: 'all'
        }
    }
}

export {
    rdi,
    pages,
    routes
}
