/* @flow */
import React from 'react'
import cn from 'classnames'
import type {
    EventHelper,
    Element
} from 'reactive-di-todomvc/i/commonInterfaces'
import type {SelectedGroup} from 'reactive-di-todomvc/i/todoInterfaces'

type TodoFooterPropsData = {
    itemsCount: number;
    selectedGroup: SelectedGroup;
    hasCompleted: boolean;
}

type TodoFooterProps = {
    data: TodoFooterPropsData;
    helper: EventHelper;
    clearCompleted(): void;
    showAll(): void;
    showActive(): void;
    showCompleted(): void;
};

export default function TodoFooter({
    showAll,
    showActive,
    showCompleted,
    clearCompleted,
    data,
    helper
}: TodoFooterProps): Element {
    return (
        <footer className="footer">
            <span className="todo-count"><strong>{data.itemsCount}</strong> item left</span>
            <ul className="filters">
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'all'})}
                        href="/"
                        onClick={helper.click(showAll)}
                    >All</a>
                </li>
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'active'})}
                        href="/active"
                        onClick={helper.click(showActive)}
                    >Active</a>
                </li>
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'completed'})}
                        href="/completed"
                        onClick={helper.click(showCompleted)}
                    >Completed</a>
                </li>
            </ul>
            {data.hasCompleted
                ? <button
                    className="clear-completed"
                    onClick={helper.click(clearCompleted)}
                >Clear completed</button>
                : null
            }
        </footer>
    )
}
