/* @flow */

import React, {Component, PropTypes as p} from 'react'

import TodoFooter from '../components/TodoFooter'
import TodoHeader from '../components/TodoHeader'
import TodoMain from '../components/TodoMain'
import TodoElement from '../components/TodoElement'
import type {TodoAppPageProps} from '../facets/TodoAppPageFacet'

type TodoWidgetState = {
    widgets: {
        TodoHeader: Class<TodoHeader>,
        TodoElement: Class<TodoElement>
    },
    props: TodoAppPageProps;
}

export default class TodoWidget extends Component<any, void, TodoWidgetState> {
    static contextTypes = {
        bindReactState: p.func.isRequired
    };
    state: TodoWidgetState;

    constructor(props: Object, context: RdiContext<any, void, TodoWidgetState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    render(): ReactElement {
        const {
            widgets,
            props
        } = this.state

        const {
            TodoHeader,
            TodoElement
        } = widgets

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
