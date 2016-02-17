/* @flow */
import React, {Component} from 'react'
import type {TodoElementActions} from 'reactive-di-todomvc/todo/components/TodoElement'
import type {TodoItem} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoElementListProps = {
    ItemTemplate: Class<Component>;
    items: Array<TodoItem>;
    itemActions: TodoElementActions;
};

export default class TodoElementList extends Component<void, TodoElementListProps, void> {
    render(): ReactElement {
        const {
            ItemTemplate,
            items,
            itemActions
        } = this.props;

        return (
            <ul className="todo-list">
                {items.map((item: TodoItem) =>
                    <ItemTemplate
                        item={item}
                        actions={itemActions}
                        key={item.id}
                    />
                )}
            </ul>
        )
    }
}
