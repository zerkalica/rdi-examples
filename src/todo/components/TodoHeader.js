/* @flow */

import React, {Component, PropTypes} from 'react'

import {
    handleChange,
    handleEnter
} from 'reactive-di-todomvc/common/eventHelpers'
import type {
    TodoItem,
    TodoEditingRec
} from 'reactive-di-todomvc/i/todoInterfaces'
import type {ComponentContext} from 'reactive-di-react/i/interfaces'

type TodoHeaderProps = {
    addTodo(item: TodoItem): void;
};

type TodoHeaderState = {
    addingItem: TodoItem;
    assign(rec: TodoEditingRec): void;
}

export default class TodoHeader extends Component<void, TodoHeaderProps, TodoHeaderState> {
    static contextTypes = {
        bindReactState: PropTypes.func.isRequired
    };

    constructor(props: TodoHeaderProps, context: ComponentContext<TodoHeaderState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    state: TodoHeaderState;

    _handleChange: Function = handleChange((title: string) => this.assign({title}));
    _handleEnter: Function = handleEnter(() => this.props.addTodo(this.state.addingItem));
    render(): ReactElement {
        const {addingItem} = this.state

        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    type="text"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={addingItem.title}
                    onChange={this._handleChange}
                    onKeyPress={this._handleEnter}
                />
            </header>
        )
    }
}
