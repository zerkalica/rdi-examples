/* @flow */


import {
    KEY_ENTER,
    KEY_ESC
} from 'reactive-di-todomvc/common/helpers/keyCodes'
import type {Tr, EventHelper} from 'reactive-di-todomvc/i/commonInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'
import type {
    TodoItem,
    TodoItemAdding,
    TodoItemRec
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoHeaderProps = {
    tr: Tr,
    addingItem: TodoItemAdding;
    helper: EventHelper;
    ErrorableElement: Class<React$Component<void, {
        error: ?string|React$Component,
    }, void>>,
    cancelAdding(): void;
    commitAdding(item: TodoItem): void;
    changeAdding(rec: TodoItemRec): void;
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
