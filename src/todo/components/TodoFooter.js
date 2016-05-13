/* @flow */

import type {
    FlowFix,
    Element,
    EventHelper
} from 'reactive-di-todomvc/common'
import type {RouterManager} from 'modern-router'
import type {Tr} from 'any-translate'
import type {
    TodoItemsFacet,
    ClearCompleted,
    ShowAll,
    ShowActive,
    ShowCompleted
} from 'reactive-di-todomvc/todo'

import cn from 'classnames'

type TodoFooterProps = {
    tr: Tr,
    router: RouterManager;
    data: TodoItemsFacet;
    helper: EventHelper;
    clearCompleted: ClearCompleted;
    showAll: ShowAll;
    showActive: ShowActive;
    showCompleted: ShowCompleted;
};

export type ITodoFooter = FlowFix<void>;

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
