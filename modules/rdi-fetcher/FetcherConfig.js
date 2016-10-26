/* @flow */

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'FetcherConfig'})
export default class FetcherConfig extends BaseModel<*> {
    baseUrl: string

    static defaults = {
        baseUrl: ''
    }
}
