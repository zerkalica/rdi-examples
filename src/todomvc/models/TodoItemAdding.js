/* @flow */
import rdi from '../../common/annotations'
import {TodoItemImpl} from './TodoItemCollection'

class TodoItemAdding extends TodoItemImpl {}
export default rdi.model(TodoItemAdding)
