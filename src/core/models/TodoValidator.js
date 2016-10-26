// @flow

import type {TodoRec} from 'rdi-todo/core/models/Todo'
import TodoErrors from './TodoErrors'
import TodoValidatorLang from './TodoValidatorLang'

export default class TodoValidator {
    _lang: TodoValidatorLang

    constructor(lang: TodoValidatorLang) {
        this._lang = lang
    }

    validate(todo: TodoRec): TodoErrors {
        const {_lang: l} = this
        const errors = new TodoErrors()
        if (!todo.title) {
            errors.isError = true
            errors.title = l.requiredTitle
        }

        return errors
    }
}
