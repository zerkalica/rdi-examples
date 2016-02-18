/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import TodoAppPageFacet from 'reactive-di-todomvc/todo/facets/TodoAppPageFacet'
import TodoEditingActions from 'reactive-di-todomvc/todo/actions/TodoEditingActions'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'
import TodoWidget from 'reactive-di-todomvc/todo/components/TodoWidget'

const {assignAdding, assignEditing, beginEditing, cancelEditing} = TodoEditingActions

class TodoAppPageChildWidgets {
    TodoElement: TodoElement = rdi.react({
        editingItem: TodoItemEditing,
        assign: assignEditing,
        beginEditing,
        cancelEditing
    })(TodoElement);

    TodoHeader: TodoHeader = rdi.react({
        addingItem: TodoItemAdding,
        assign: assignAdding
    })(TodoHeader);
}

export default rdi.react({
    widgets: rdi.klass()(TodoAppPageChildWidgets),
    props: TodoAppPageFacet
})(TodoWidget)
