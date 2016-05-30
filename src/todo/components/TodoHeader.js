/* @flow */

import type {Tr} from 'any-translate'
import type {
    Element,
    EventHelper
} from 'reactive-di-todomvc/common/i'
import type {
    CancelAdding,
    CommitAdding,
    ChangeAdding
} from 'reactive-di-todomvc/todo/i'
import type {IErrorableElement} from 'reactive-di-todomvc/common/i'

import TodoItemAdding from 'reactive-di-todomvc/todo/models/TodoItemAdding'
import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'

type TodoHeaderProps = {
    tr: Tr,
    addingItem: TodoItemAdding;
    helper: EventHelper;
    ErrorableElement: IErrorableElement,
    cancelAdding: CancelAdding;
    commitAdding: CommitAdding;
    changeAdding: ChangeAdding;
};

export default function TodoHeader({
    tr,
    addingItem,
    ErrorableElement,
    changeAdding,
    commitAdding,
    cancelAdding,
    helper
}: TodoHeaderProps): Element {
    return (
        <header className="header">
            <h1>{tr('todos')}</h1>
            <ErrorableElement error={addingItem.errors.title}>
                <input
                    className="new-todo"
                    type="text"
                    placeholder={tr('What needs to be done?')}
                    autoFocus
                    value={addingItem.item.title}
                    onBlur={helper.click(cancelAdding)}
                    onChange={helper.change((title) => changeAdding({title}))}
                    onKeyPress={helper.keyMap([
                        [KEY_ENTER, commitAdding, addingItem.item],
                        [KEY_ESC, cancelAdding]
                    ])}
                />
            </ErrorableElement>
        </header>
    )
}
