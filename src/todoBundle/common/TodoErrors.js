// @flow
import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'TodoErrors'})
export default class TodoErrors extends BaseModel<*> {
    title: string
    isError: boolean

    static defaults = {
        title: '',
        isError: false
    }
}
