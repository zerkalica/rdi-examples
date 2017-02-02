// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'TodoHeaderLang'})
export default class TodoHeaderLang extends BaseModel {
    todoPlaceholder = 'Todo'
    todos = 'Todos'
}
