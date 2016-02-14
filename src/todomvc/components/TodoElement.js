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
    beginEditing(id: string): void;
    cancelEditing(): void;
    assign(rec: TodoEditingRec): void;
};

export default class TodoElement extends Component<void, TodoItemProps, void> {
    _handleKeyPress(e: Event): void {
        const {
            editingItem,
            change,
            cancelEditing
        } = this.props

        e.preventDefault()

        switch (e.keyCode) {
            case 13:
                change(editingItem)
                break
            case 27:
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

        const {
            remove,
            toggle,
            change
        } = actions

        const isEditing = editingItem.id === item.id

        return (
            <li
                className={cn({
                    completed: item.isCompleted,
                    editing: isEditing
                })}
                onDoubleClick={() => beginEditing(item.id)}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => toggle(item.id)}
                    />
                    <label>{item.title}</label>
                    <button className="destroy" onClick={() => remove(item.id)}></button>
                </div>
                <input
                    className="edit"
                    value={editingItem.title}
                    onChange={handleChange((title: string) => assign({title}))}
                    onKeyPress={(e: Event) => this._handleKeyPress(e)}
                />
            </li>
        )
    }
}
