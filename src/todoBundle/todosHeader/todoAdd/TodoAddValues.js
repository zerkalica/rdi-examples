// @flow

import {source} from 'reactive-di/annotations'

export interface TodoAddValuesRec {
}

@source({key: 'TodoAddValues'})
export default class TodoAddValues {
    title = ''
}
