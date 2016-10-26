// @flow

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoTheme {
    wrapper: string
    completed: string
    beginEdit: string
    editingTitle: string
    commitEdit: string
    cancelEdit: string

    deleteTodo: string
    deleteIcon: string
    okIcon: string
    cancelIcon: string

    __css: mixed

    constructor() {
        this.__css = {
            wrapper: {
                composes: ['input-group']
            },
            completed: {
                composes: ['input-group-addon']
            },
            editingTitle: {
                composes: ['form-control']
            },
            beginEdit: {
                composes: ['form-control', 'btn', 'btn-secondary'],
                textAlign: 'left',
                overflow: 'hidden'
            },
            commitEdit: {
                composes: ['btn', 'btn-primary']
            },
            cancelEdit: {
                composes: ['btn', 'btn-secondary']
            },
            deleteTodo: {
                composes: ['btn', 'btn-danger']
            },
            deleteIcon: {
                composes: ['fa', 'fa-trash-o']
            },
            okIcon: {
                composes: ['fa', 'fa-check-square']
            },
            cancelIcon: {
                composes: ['fa', 'fa-ban']
            }
        }
    }
}
