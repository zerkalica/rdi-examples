/* @flow */
import React, {Component} from 'react'
import {
    handleChange,
    handleEnter
} from '../../common/eventHelpers'
import type {
    TodoItem,
    TodoEditingRec
} from '../interfaces'

type TodoHeaderProps = {
    addingItem: TodoItem;
    assign(rec: TodoEditingRec): void;
    addTodo(item: TodoItem): void;
};

export default class TodoHeader extends Component<void, TodoHeaderProps, void> {
    render(): ReactElement {
        const {
            assign,
            addingItem,
            addTodo
        }: TodoHeaderProps = this.props;

        function change(title: string) {
            assign({title})
        }

        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    type="text"
                    placeholder="What needs to be done?"
                    autofocus
                    value={addingItem.title}
                    onChange={handleChange(change)}
                    onKeyPress={handleEnter(() => addTodo(addingItem))}
                />
            </header>
        )
    }
}
