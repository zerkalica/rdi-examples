/* @flow */
import React, {Component, PropTypes} from 'react'
import type {ComponentContext} from 'reactive-di-react/i/interfaces'
import {
    handleChange,
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/eventHelpers'
import cn from 'classnames'

import type {
    TodoItem,
    TodoEditingRec
} from 'reactive-di-todomvc/i/todoInterfaces'

export type TodoElementActions = {
    remove(id: string): void;
    toggle(id: string): void;
    change(item: TodoItem): void;
}

type TodoElementProps = {
    item: TodoItem;
    actions: TodoElementActions;
};

type TodoElementState = {
    editingItem: TodoItem;
    beginEditing(item: TodoItem): void;
    cancelEditing(): void;
    assign(rec: TodoEditingRec): void;
}

export default class TodoElement extends Component<void, TodoElementProps, TodoElementState> {
    state: TodoElementState;

    static contextTypes = {
        bindReactState: PropTypes.func.isRequired
    };

    constructor(props: TodoElementProps, context: ComponentContext<TodoElementState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    _handleKeyDown(e: SyntheticKeyboardEvent): void {
        const {actions} = this.props
        const {
            editingItem,
            cancelEditing
        } = this.state

        switch (e.keyCode) {
            case KEY_ENTER:
                actions.change(editingItem)
                break
            case KEY_ESC:
                cancelEditing()
                break
            default:
                break
        }
    }

    render(): ReactElement {
        const {
            item,
            actions
        }: TodoElementProps = this.props;

        const {
            editingItem,
            assign,
            beginEditing
        }: TodoElementState = this.state;

        const isEditing = editingItem.id === item.id

        return (
            <li
                className={cn({
                    completed: item.isCompleted,
                    editing: isEditing
                })}
                onDoubleClick={() => beginEditing(item)}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => actions.toggle(item.id)}
                    />
                    <label>{item.title}</label>
                    <button className="destroy" onClick={() => actions.remove(item.id)}></button>
                </div>
                <input
                    className="edit"
                    value={editingItem.title}
                    onChange={handleChange((title: string) => assign({title}))}
                    onKeyDown={e => this._handleKeyDown(e)}
                />
            </li>
        )
    }
}
