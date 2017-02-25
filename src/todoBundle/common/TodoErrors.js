// @flow
import {source} from 'reactive-di/annotations'

@source({key: 'TodoErrors'})
export default class TodoErrors {
    title = ''
    isError = false
}
