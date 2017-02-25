// @flow
import {source} from 'reactive-di/annotations'
import Todo from 'rdi-todo/todoBundle/common/Todo'

@source({key: 'EditableTodo'})
export default class EditableTodo extends Todo {
    title: string
}
