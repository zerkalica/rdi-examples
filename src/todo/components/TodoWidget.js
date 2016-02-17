/* @flow */

import React, {Component, PropTypes as p} from 'react'

import TodoFooter from 'reactive-di-todomvc/todo/components/TodoFooter'
import TodoHeader from 'reactive-di-todomvc/todo/components/TodoHeader'
import TodoMain from 'reactive-di-todomvc/todo/components/TodoMain'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
import type {TodoAppPageProps} from 'reactive-di-todomvc/todo/facets/TodoAppPageFacet'
import type {ComponentContext} from 'reactive-di-react/i/interfaces'

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

    constructor(props: Object, context: ComponentContext<TodoWidgetState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    state: TodoWidgetState;

    render(): ReactElement {
        const {
            widgets,
            props
        } = this.state

        const {
            filterActions,
            crudActions,
            isAllCompleted,
            items,
            itemsCount,
            selectedGroup,
            hasCompleted
        } = props

        const {add, clearCompleted, toggleAll, remove, toggle, change} = crudActions

        return (
            <section className="todoapp">
                <widgets.TodoHeader
                    addTodo={add}
                />
                {itemsCount > 0
                    ? <TodoMain
                        ItemTemplate={widgets.TodoElement}
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
