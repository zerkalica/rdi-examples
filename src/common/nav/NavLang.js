// @flow
import {source} from 'reactive-di/annotations'
import {BaseModel} from 'reactive-di'

@source({key: 'NavLang'})
export default class NavLang extends BaseModel {
    todos = 'Todos'
}
