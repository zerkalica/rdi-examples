/* @flow */

import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'
import type {EventHelper} from 'reactive-di-todomvc/i/commonInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'

import cn from 'classnames'

import type {
    TodoItem,
    TodoItemEditing,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoElementProps = {
    ErrorableElement: Class<React$Component<void, {
        error: ?string;
    }, void>>;
    removeTodoItem(id: string): void;
    toggleTodoItem(id: string): void;

    editingItem: TodoItemEditing;
    beginEditing(item: TodoItem): void;
    commitEditing(item: TodoItem): void;
    cancelEditing(): void;
    changeEditing(rec: TodoItemRec): void;

    helper: EventHelper;
    /* @args */
    item: TodoItem;
};

export default function TodoElement({
    item,
    ErrorableElement,
    toggleTodoItem,
    removeTodoItem,

    beginEditing,
    cancelEditing,
    changeEditing,
    commitEditing,

    editingItem,
    helper
}: TodoElementProps): Element {
    const isEditing = editingItem.isEditing && editingItem.item.id === item.id
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
                    onChange={helper.change(() => toggleTodoItem(item.id))}
                />
                <label>{item.title}</label>
                <button
                    className="destroy"
                    onClick={helper.click(removeTodoItem, item.id)}
                ></button>
            </div>
            {isEditing ?
                <ErrorableElement error={editingItem.errors.title}>
                    <input
                        autoFocus
                        className="edit"
                        value={editingItem.item.title}
                        onBlur={helper.click(cancelEditing)}
                        onChange={helper.change((title: string) => changeEditing({title}))}
                        onKeyPress={helper.keyMap([
                            [KEY_ESC, cancelEditing],
                            [KEY_ENTER, commitEditing, editingItem.item]
                        ])}
                    />
                </ErrorableElement>
            : null}
        </li>
    )
}
