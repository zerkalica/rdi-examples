// @flow

import {source} from 'reactive-di/annotations'

@source({key: 'TodoHeaderLang'})
export default class TodoHeaderLang {
    todoPlaceholder = 'Todo'
    todos = 'Todos'
}
