/* @flow */

import React, {Component, PropTypes} from 'react'

import {
    handleChange,
    handleEnter
} from '../../common/eventHelpers'
import type {
    TodoItem,
    TodoEditingRec
} from '../interfaces'

type TodoHeaderProps = {
    addTodo(item: TodoItem): void;
};

type TodoHeaderState = {
    addingItem: TodoItem;
    assign(rec: TodoEditingRec): void;
}

export default class TodoHeader extends Component<void, TodoHeaderProps, TodoHeaderState> {
    state: TodoHeaderState;

    static contextTypes = {
        bindReactState: PropTypes.func.isRequired
    };

    constructor(props: TodoHeaderProps, context: RdiContext<void, TodoHeaderProps, TodoHeaderState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    render(): ReactElement {
        const {
            addTodo
        } = this.props
        const {
            assign,
            addingItem
        } = this.state

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
