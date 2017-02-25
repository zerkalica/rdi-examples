// @flow

import {source} from 'reactive-di/annotations'

export interface TodoAddLangRec {
    todoPlaceholder?: string
}

@source({key: 'TodoAddLang'})
export default class TodoAddLang {
    todoPlaceholder = 'What need to add?'
}
