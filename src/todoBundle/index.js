// @flow
import type {RouteConfig} from 'modern-router'
import {createFetch} from 'rdi-fetcher'
import {EmulatedApi, createEmulatedFetch} from 'rdi-api-emulator'
import {SavingStatus} from 'rdi-todo/common/nav/NavView'

import createTodoEmulatedApi from './todoApiEmulator/createTodoEmulatedApi'
import TodosPage, {TodosPageSavingStatus} from './TodosPage'

const rdi = [
    [SavingStatus, TodosPageSavingStatus],
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
