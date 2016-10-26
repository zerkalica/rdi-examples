// @flow
import {source} from 'reactive-di/annotations'
import Todo from 'rdi-todo/core/models/Todo'

@source({key: 'EditableTodo'})
export default class EditableTodo extends Todo {}
