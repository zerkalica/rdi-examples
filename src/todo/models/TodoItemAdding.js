/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import {TodoItemImpl} from 'reactive-di-todomvc/todo/models/TodoItemCollection'

class TodoItemAdding extends TodoItemImpl {}
export default rdi.model(TodoItemAdding)
