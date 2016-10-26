// @flow

import {RouterManager} from 'modern-router'
import {EventHelper} from 'rdi-helpers'
import NavTheme from './NavTheme'

interface NavState {
    rm: RouterManager;
    theme: NavTheme;
    helper: EventHelper;
}

export default function NavView(
    props: {},
    {
        theme,
        rm,
        helper
    }: NavState
) {
    return <nav className={theme.wrapper}>
        <ul className={theme.block}>
            <li className={theme.active}>
                <a
                    className={theme.link}
                    onClick={helper.click(() => {})}
                    href={rm.build('TodosPage', {group: 'all'})}
                >Todos</a>
            </li>
        </ul>
    </nav>
}
