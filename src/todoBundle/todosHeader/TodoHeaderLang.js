// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'TodoHeaderLang'})
export default class TodoHeaderLang extends BaseModel<Object> {
    todoPlaceholder: string
    todos: string

    static defaults = {
        todos: 'Todos',
        todoPlaceholder: 'Todo'
    }
}
