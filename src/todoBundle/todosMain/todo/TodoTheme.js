// @flow

import {SourceStatus} from 'reactive-di'

import {theme} from 'reactive-di/annotations'

@theme
export default class TodoTheme {
    wrapper: string
    completed: string
    beginEdit: string
    beginEditPending: string
    beginEditError: string
    editingTitle: string
    commitEdit: string
    cancelEdit: string

    deleteTodo: string
    deleteIcon: string
    okIcon: string
    cancelIcon: string
    id: string

    __css: mixed

    constructor() {
        const beginEdit = {
            composes: ['form-control', 'btn', 'btn-secondary'],
            textAlign: 'left',
            overflow: 'hidden'
        }
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
                ...beginEdit
            },
            beginEditPending: {
                ...beginEdit,
                composes: ['alert-warning']
            },
            beginEditError: {
                ...beginEdit,
                composes: ['alert-danger']
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
            },
            id: {
                composes: ['input-group-addon'],
                width: '50px',
                overflow: 'hidden',
                paddingLeft: '3px',
                fontSize: '80%'
            }
        }
    }

    getBeginEdit(status: SourceStatus): string {
        return status.complete
            ? this.beginEdit
            : status.error
                ? this.beginEditError
                : this.beginEditPending
    }
}
