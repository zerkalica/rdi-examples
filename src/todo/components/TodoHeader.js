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
import type {
    TodoItem,
    TodoItemAdding,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoHeaderProps = {
    addingItem: TodoItemAdding;
    helper: EventHelper;
    cancelAdding(): void;
    commitAdding(item: TodoItem): void;
    changeAdding(rec: TodoItemRec): void;
};

export default function TodoHeader({
    addingItem,
    changeAdding,
    commitAdding,
    cancelAdding,
    helper
}: TodoHeaderProps): Element {
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                type="text"
                placeholder="What needs to be done?"
                autoFocus
                value={addingItem.item.title}
                onBlur={helper.click(cancelAdding)}
                onChange={helper.change((title) => changeAdding({title}))}
                onKeyPress={helper.keyMap([
                    [KEY_ENTER, commitAdding, addingItem.item],
                    [KEY_ESC, cancelAdding]
                ])}
            />
        </header>
    )
}
