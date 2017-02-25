/* @flow */

import {source} from 'reactive-di/annotations'

@source({key: 'FetcherConfig'})
export default class FetcherConfig {
    baseUrl = ''
}
