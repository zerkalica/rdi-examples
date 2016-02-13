/* @flow */
import rdi from '../../common/annotations'
import {TodoItemImpl} from './TodoItemCollection'

class TodoItemEditing extends TodoItemImpl {}
export default rdi.model(TodoItemEditing)
