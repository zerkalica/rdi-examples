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
    static contextTypes = {
        bindReactState: PropTypes.func.isRequired
    };

    constructor(props: TodoElementProps, context: ComponentContext<TodoElementState>) {
        super(props, context)
        this.state = context.bindReactState(this)
    }

    state: TodoElementState;

    _handleKeyDown: (e: SyntheticKeyboardEvent) => void = (e: SyntheticKeyboardEvent) => {
        const {cancelEditing} = this.state

        switch (e.keyCode) {
            case KEY_ENTER:
                this._handleCommitChanges()
                break
            case KEY_ESC:
                cancelEditing()
                break
            default:
                break
        }
    };

    _handleCommitChanges: Function = () => {
        this.props.actions.change(this.state.editingItem)
    };

    _beginEditing: Function = () => {
        this.state.beginEditing(this.props.item)
    };

    _toggle: Function = () => {
        this.props.actions.toggle(this.props.item.id)
    };

    _remove: Function = () => {
        this.props.actions.remove(this.props.item.id)
    };

    _handleChangeTitle: Function = handleChange((title: string) => this.state.assign({title}));

    render(): ReactElement {
        const {item} = this.props;
        const {editingItem} = this.state
        const isEditing = editingItem.id === item.id

        return (
            <li
                className={cn({
                    completed: item.isCompleted,
                    editing: isEditing
                })}
                onDoubleClick={this._beginEditing}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={this._toggle}
                    />
                    <label>{item.title}</label>
                    <button className="destroy" onClick={this._remove}></button>
                </div>
                {isEditing ?
                    <input
                        autoFocus
                        className="edit"
                        value={editingItem.title}
                        onBlur={this._handleCommitChanges}
                        onChange={this._handleChangeTitle}
                        onKeyDown={this._handleKeyDown}
                    />
                : null}
            </li>
        )
    }
}
