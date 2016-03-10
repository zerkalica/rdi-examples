/* @flow */
import React from 'react'
import cn from 'classnames'
import type {Tr, EventHelper} from 'reactive-di-todomvc/i/commonInterfaces'
import type {Element} from 'reactive-di-react/i/interfaces'
import type {SelectedGroup} from 'reactive-di-todomvc/i/todoInterfaces'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'

type TodoFooterPropsData = {
    itemsCount: number;
    totalCount: number;
    selectedGroup: SelectedGroup;
    hasCompleted: boolean;
}

type TodoFooterProps = {
    tr: Tr,
    router: AbstractRouterManager;
    data: TodoFooterPropsData;
    helper: EventHelper;
    clearCompleted(): void;
    showAll(): void;
    showActive(): void;
    showCompleted(): void;
};

export default function TodoFooter({
    tr,
    router,
    showAll,
    showActive,
    showCompleted,
    clearCompleted,
    data,
    helper
}: TodoFooterProps): Element {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{tr('#{count} of #{total}', {
                    count: data.itemsCount,
                    total: data.totalCount
                })}</strong>
                {tr('item left')}
            </span>
            <ul className="filters">
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'all'})}
                        href={router.build('index')}
                        onClick={helper.click(showAll)}
                    >{tr('All')}</a>
                </li>
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'active'})}
                        href={router.build('TodoPage', {group: 'active'})}
                        onClick={helper.click(showActive)}
                    >{tr('Active')}</a>
                </li>
                <li>
                    <a
                        className={cn({selected: data.selectedGroup === 'completed'})}
                        href={router.build('TodoPage', {group: 'completed'})}
                        onClick={helper.click(showCompleted)}
                    >{tr('Completed')}</a>
                </li>
            </ul>
            {data.hasCompleted
                ? <button
                    className="clear-completed"
                    onClick={helper.click(clearCompleted)}
                >{tr('Clear completed')}</button>
                : null
            }
        </footer>
    )
}
