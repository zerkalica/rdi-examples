/* @flow */
import React, {Component} from 'react'
import {handleChange} from '../../common/eventHelpers'
import cn from 'classnames'

import type {
    TodoItem,
    TodoEditingRec
} from '../interfaces'

export type TodoItemActions = {
    remove(id: string): void;
    toggle(id: string): void;
    change(item: TodoItem): void;
}

type TodoItemProps = {
    item: TodoItem;
    actions: TodoItemActions;
    editingItem: TodoItem;
    beginEditing(item: TodoItem): void;
    cancelEditing(): void;
    assign(rec: TodoEditingRec): void;
};

const KEY_ENTER = 13
const KEY_ESC = 27

export default class TodoElement extends Component<void, TodoItemProps, void> {
    _handleKeyDown(e: SyntheticKeyboardEvent): void {
        const {
            editingItem,
            actions,
            cancelEditing
        } = this.props

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
            actions,

            editingItem,
            assign,
            beginEditing
        }: TodoItemProps = this.props;

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
