/* @flow */
import React, {Component} from 'react'
import {
    handleChange,
    handleEnter
} from '../../common/eventHelpers'
import TodoItemList from './TodoItemList'
import type {TodoItemActions} from './TodoItemList'

import type {
    TodoItem
} from '../interfaces'


type TodoMainActions = TodoItemActions & {
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
        }: TodoMainProps = this.props;
        const {toggleAll, remove, change, toggle} = actions
        return (
            <section class="main">
                <input class="toggle-all" onClick={toggleAll} value={isAllCompleted} type="checkbox"/>
                <label for="toggle-all">Mark all as complete</label>
                <TodoItemList
                    ItemTemplate={ItemTemplate}
                    items={items}
                    itemActions={{remove, change, toggle}}
                />
            </section>
        )
    }
}
