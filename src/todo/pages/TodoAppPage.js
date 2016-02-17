/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import TodoAppPageFacet from 'reactive-di-todomvc/todo/facets/TodoAppPageFacet'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoWidget from 'reactive-di-todomvc/todo/components/TodoWidget'
import {
    beginEditing,
    cancelEditing,
    assignEditing,
    assignAdding
} from 'reactive-di-todomvc/todo/actions/TodoEditingActions'

const TodoElementInj = rdi.observable({
    editingItem: TodoItemEditing,
    assign: assignEditing,
    beginEditing,
    cancelEditing
})(TodoElement)

const TodoHeaderInj = rdi.observable({
    addingItem: TodoItemAdding,
    assign: assignAdding
})(TodoHeader)

class TodoAppPageChildWidgets {
    TodoElement: TodoElement = TodoHeaderInj;
    TodoHeader: TodoHeader = TodoElementInj;
}
const TodoAppPageChildWidgetsInj = rdi.klass()(TodoAppPageChildWidgets)

const TodoAppPage = rdi.observable({
    widgets: TodoAppPageChildWidgetsInj,
    props: TodoAppPageFacet
})(TodoWidget)

export default TodoAppPage
