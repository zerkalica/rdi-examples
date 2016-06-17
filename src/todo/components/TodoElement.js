/* @flow */
import {component} from 'reactive-di-observable/annotations'

import type {
    IErrorableElement,
    Element,
    EventHelper
} from 'reactive-di-todomvc/common/i'

import type {
    TodoElementProps,

    RemoveTodoItem,
    ToggleTodoItem,

    BeginEditing,
    CommitEditing,
    CancelEditing,
    ChangeEditing
} from 'reactive-di-todomvc/todo/i'

import cn from 'classnames'
import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'
import TodoItemEditing from 'reactive-di-todomvc/todo/models/TodoItemEditing'

type TodoElementOptions = TodoElementProps & {
    ErrorableElement: IErrorableElement;
    editingItem: TodoItemEditing;

    removeTodoItem: RemoveTodoItem;
    toggleTodoItem: ToggleTodoItem;

    beginEditing: BeginEditing;
    commitEditing: CommitEditing;
    cancelEditing: CancelEditing;
    changeEditing: ChangeEditing;
    helper: EventHelper;
}

@component()
export default class TodoElement {
    props: TodoElementOptions;

    constructor(props: TodoElementOptions) {
        this.props = props
    }

    _beginEditing = (e: Event): void => {
        const {beginEditing, item} = this.props
        e.stopPropagation()
        beginEditing(item)
    };

    render({
        item,
        ErrorableElement,
        toggleTodoItem,
        removeTodoItem,

        cancelEditing,
        changeEditing,
        commitEditing,

        editingItem,
        helper
    }: TodoElementOptions): Element {
        const isEditing = editingItem.isEditing && editingItem.item.id === item.id
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
}
