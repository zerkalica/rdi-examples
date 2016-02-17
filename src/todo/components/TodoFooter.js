/* @flow */
import React, {Component} from 'react'
import cn from 'classnames'

import type {
    SelectedGroup
} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoFooterActions = {
    showAll(): void;
    showActive(): void;
    showCompleted(): void;
}

type TodoFooterProps = {
    itemsCount: number;
    selectedGroup: SelectedGroup;
    filterActions: TodoFooterActions;
    hasCompleted: boolean;
    clearCompleted(): void;
};

export default class TodoFooter extends Component<void, TodoFooterProps, void> {
    render(): ReactElement {
        const {
            itemsCount,
            selectedGroup,
            filterActions,
            clearCompleted,
            hasCompleted
        } = this.props;

        const {
            showAll,
            showActive,
            showCompleted
        } = filterActions

        return (
            <footer className="footer">
                <span className="todo-count"><strong>{itemsCount}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a
                            className={cn({selected: selectedGroup === 'all'})}
                            href="#/"
                            onClick={showAll}
                        >All</a>
                    </li>
                    <li>
                        <a
                            className={cn({selected: selectedGroup === 'active'})}
                            href="#/active"
                            onClick={showActive}
                        >Active</a>
                    </li>
                    <li>
                        <a
                            className={cn({selected: selectedGroup === 'completed'})}
                            href="#/completed"
                            onClick={showCompleted}
                        >Completed</a>
                    </li>
                </ul>
                {hasCompleted
                    ? <button
                        className="clear-completed"
                        onClick={clearCompleted}
                    >Clear completed</button>
                    : null
                }
            </footer>
        )
    }
}
