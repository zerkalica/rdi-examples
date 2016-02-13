/* @flow */

import React, {Component} from 'react'
import {statefull} from 'reactive-di-react'

import TodoAppPageFacet from '../facets/TodoAppPageFacet'
import TodoFooter from '../components/TodoFooter'
import TodoHeader from '../components/TodoHeader'
import TodoItemAdding from '../models/TodoItemAdding'
import TodoItemEditing from '../models/TodoItemEditing'
import TodoMain from '../components/TodoMain'
import {
    beginEditing,
    cancelEditing,
    assignEditing,
    assignAdding
} from '../actions/TodoEditingActions'
import {TodoElement} from '../components/TodoItemList'
import type {TodoAppPageProps} from '../facets/TodoAppPageFacet'

class TodoElementInj extends TodoElement {}
statefull({
    editingItem: TodoItemEditing,
    assign: assignEditing,
    beginEditing,
    cancelEditing
})(TodoElementInj)

class TodoHeaderInj extends TodoHeader {}
statefull({
    addingItem: TodoItemAdding,
    assign: assignAdding
})(TodoHeaderInj)

export default class TodoAppPageInj extends Component<any, TodoAppPageProps, any> {
    render(): ReactElement {
        const {
            addTodo,
            filterActions,
            crudActions,
            isAllCompleted,
            items,
            itemsCount,
            selectedGroup,
            hasCompleted
        }: TodoAppPageProps = this.props;
        const {add, clearCompleted, toggleAll, remove, toggle, change} = crudActions

        return (
            <section className="todoapp">
                <TodoHeaderInj
                    addTodo={add}
                />
                {itemsCount > 0
                    ? <TodoMain
                        ItemTemplate={TodoElementInj}
                        actions={{toggleAll, remove, toggle, change}}
                        isAllCompleted={isAllCompleted}
                        items={items}
                    />
                    : null
                }
                {itemsCount > 0
                    ? <TodoFooter
                        itemsCount={itemsCount}
                        selectedGroup={selectedGroup}
                        filterActions={filterActions}
                        hasCompleted={hasCompleted}
                        clearCompleted={clearCompleted}
                    />
                    : null
                }
            </section>
        )
    }
}
statefull(TodoAppPageFacet)(TodoAppPageInj)
