/* @flow */

import React, {Component} from 'react'

import TodoFooter from '../components/TodoFooter'
import TodoHeader from '../components/TodoHeader'
import TodoMain from '../components/TodoMain'
import {TodoElement} from '../components/TodoItemList'
import type {TodoAppPageProps} from '../facets/TodoAppPageFacet'

type TodoWidgetProps = {
    TodoHeader: Class<TodoHeader>;
    TodoElement: Class<TodoElement>;
    props: TodoAppPageProps;
}

export default class TodoWidget extends Component<any, TodoAppPageProps, any> {
    render(): ReactElement {
        const {
            TodoHeader,
            TodoElement,
            props
        } = this.props

        const {
            addTodo,
            filterActions,
            crudActions,
            isAllCompleted,
            items,
            itemsCount,
            selectedGroup,
            hasCompleted
        }: TodoAppPageProps = props

        const {add, clearCompleted, toggleAll, remove, toggle, change} = crudActions

        return (
            <section className="todoapp">
                <TodoHeader
                    addTodo={add}
                />
                {itemsCount > 0
                    ? <TodoMain
                        ItemTemplate={TodoElement}
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
