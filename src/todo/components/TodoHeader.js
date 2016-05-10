/* @flow */
import type {
    IErrorableElement,
    Tr,
    EventHelper
} from 'reactive-di-todomvc/i/commonInterfaces'

import type {
    TodoItemAdding,
    CancelAdding,
    CommitAdding,
    ChangeAdding
} from 'reactive-di-todomvc/i/todoInterfaces'

import {component} from 'reactive-di-react/annotations'

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

function TodoHeader({
    tr,
    addingItem,
    ErrorableElement,
    changeAdding,
    commitAdding,
    cancelAdding,
    helper
}: TodoHeaderProps): any {
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

export default component(TodoHeader)
