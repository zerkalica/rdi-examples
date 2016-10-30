/* @flow */

import {EventHelper} from 'rdi-helpers'

import TodoFilteredCollection from 'rdi-todo/todoBundle/common/TodoFilteredCollection'

import TodosFooterLang from './TodosFooterLang'
import TodosFooterTheme from './TodosFooterTheme'
import TodosFooterService from './TodosFooterService'

interface TodoFooterState {
    lang: TodosFooterLang;
    theme: TodosFooterTheme;
    data: TodoFilteredCollection;
    helper: EventHelper;
    service: TodosFooterService;
}

export default function TodosFooterView(
    props: {},
    {
        lang,
        theme,
        data,
        helper,
        service
    }: TodoFooterState
) {
    return <footer className={theme.footer}>
        <div className={theme.todoCount}>
            <strong>{lang.countOfTotal({count: data.itemsCount, total: data.totalCount})}</strong>
            {' ' + lang.itemLeft}
        </div>
        <ul className={theme.list}>
            <li className={theme.listItem}>
                <a
                    className={theme.link(data.selectedGroup === 'all')}
                    href={service.indexUrl}
                    onClick={helper.click(service.showAll)}
                >{lang.all}</a>
            </li>
            <li className={theme.listItem}>
                <a
                    className={theme.link(data.selectedGroup === 'active')}
                    href={service.activeUrl}
                    onClick={helper.click(service.showActive)}
                >{lang.active}</a>
            </li>
            <li className={theme.listItem}>
                <a
                    className={theme.link(data.selectedGroup === 'completed')}
                    href={service.completedUrl}
                    onClick={helper.click(service.showCompleted)}
                >{lang.completed}</a>
            </li>
        </ul>
        {data.hasCompleted
            ? <button
                className={theme.clearCompleted}
                onClick={helper.click(service.clearCompleted)}
            >{lang.clearCompleted}</button>
            : null
        }
    </footer>
}
