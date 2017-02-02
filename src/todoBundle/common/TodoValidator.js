// @flow

import type {TodoRec} from 'rdi-todo/todoBundle/common/Todo'
import TodoErrors from './TodoErrors'
import TodoValidatorLang from './TodoValidatorLang'

export default class TodoValidator {
    _lang: TodoValidatorLang
    _errors: TodoErrors

    constructor(lang: TodoValidatorLang, errors: TodoErrors) {
        this._lang = lang
        this._errors = errors
    }

    validate(todo: TodoRec): TodoErrors {
        const {_lang: l} = this
        const errors = this._errors.copy({})
        if (!todo.title) {
            errors.isError = true
            errors.title = l.requiredTitle
        }

        return errors
    }
}
