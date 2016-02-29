/* @flow */
import React from 'react'
import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'
import type {
    EventHelper,
    Element
} from 'reactive-di-todomvc/i/commonInterfaces'
import cn from 'classnames'

import type {
    TodoItem,
    TodoItemEditing,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoElementProps = {
    item: TodoItem;

    removeTodoItem(id: string): void;
    toggleTodoItem(id: string): void;

    editingItem: TodoItemEditing;
    beginEditing(item: TodoItem): void;
    commitEditing(item: TodoItem): void;
    cancelEditing(): void;
    changeEditing(rec: TodoItemRec): void;

    isEditing: boolean;
    helper: EventHelper;
};

export default function TodoElement({
    item,

    toggleTodoItem,
    removeTodoItem,

    beginEditing,
    cancelEditing,
    changeEditing,
    commitEditing,

    editingItem,
    isEditing,
    helper
}: TodoElementProps): Element {
    return (
        <li
            className={cn({
                completed: item.isCompleted,
                editing: isEditing
            })}
            onDoubleClick={helper.click(beginEditing, item)}
        >
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={helper.change(toggleTodoItem, item.id)}
                />
                <label>{item.title}</label>
                <button
                    className="destroy"
                    onClick={helper.click(removeTodoItem, item.id)}
                ></button>
            </div>
            {isEditing ?
                <input
                    autoFocus
                    className="edit"
                    value={editingItem.item.title}
                    onBlur={helper.click(commitEditing, editingItem.item)}
                    onChange={helper.change((title: string) => changeEditing({title}))}
                    onKeyDown={helper.keyMap([
                        [KEY_ESC, cancelEditing],
                        [KEY_ENTER, commitEditing, editingItem.item]
                    ])}
                />
            : null}
        </li>
    )
}
