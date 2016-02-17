/* @flow */
import React, {Component} from 'react'
import TodoElementList from 'reactive-di-todomvc/todo/components/TodoElementList'
import type {TodoElementActions} from 'reactive-di-todomvc/todo/components/TodoElement'

import type {
    TodoItem
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoMainActions = TodoElementActions & {
    toggleAll(): void;
}

type TodoMainProps = {
    ItemTemplate: Class<Component>;
    actions: TodoMainActions;
    isAllCompleted: boolean;
    items: Array<TodoItem>;
};

export default class TodoMain extends Component<void, TodoMainProps, void> {
    render(): ReactElement {
        const {
            ItemTemplate,
            isAllCompleted,
            actions,
            items
        } = this.props;
        const {toggleAll, remove, change, toggle} = actions
        return (
            <section className="main">
                <input
                    className="toggle-all"
                    id="toggle-all"
                    onClick={toggleAll}
                    checked={isAllCompleted}
                    type="checkbox"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoElementList
                    ItemTemplate={ItemTemplate}
                    items={items}
                    itemActions={{remove, change, toggle}}
                />
            </section>
        )
    }
}
