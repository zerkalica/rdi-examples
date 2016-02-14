/* @flow */
import React, {Component} from 'react'
import {
    handleChange,
    handleEnter
} from '../../common/eventHelpers'
import cn from 'classnames'
import TodoElement from './TodoElement'
import type {TodoItemActions} from './TodoElement'
import type {TodoItem} from '../interfaces'

type TodoElementListProps = {
    ItemTemplate: Class<Component>;
    items: Array<TodoItem>;
    itemActions: TodoItemActions;
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
