/* @flow */
import React, {Component} from 'react'
import {
    handleChange,
    handleEnter
} from 'reactive-di-todomvc/common/eventHelpers'
import cn from 'classnames'
import TodoElement from 'reactive-di-todomvc/todo/components/TodoElement'
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
        }: TodoElementListProps = this.props;

        return (
            <ul className="todo-list">
                {items.map(item =>
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
