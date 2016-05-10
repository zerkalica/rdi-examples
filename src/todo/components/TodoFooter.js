/* @flow */

import type {Tr, EventHelper} from 'reactive-di-todomvc/i/commonInterfaces'
import type {
    ClearCompleted,
    ShowAll,
    ShowActive,
    ShowCompleted,
    TodoFooterPropsData
} from 'reactive-di-todomvc/i/todoInterfaces'

import {component} from 'reactive-di-react/annotations'
import cn from 'classnames'
import {AbstractRouterManager} from 'modern-router'

type TodoFooterProps = {
    tr: Tr,
    router: AbstractRouterManager;
    data: TodoFooterPropsData;
    helper: EventHelper;
    clearCompleted: ClearCompleted;
    showAll: ShowAll;
    showActive: ShowActive;
    showCompleted: ShowCompleted;
};

function TodoFooter({
    tr,
    router,
    showAll,
    showActive,
    showCompleted,
    clearCompleted,
    data,
    helper
}: TodoFooterProps): any {
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

export default component(TodoFooter)
