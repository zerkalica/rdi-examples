// @flow

import {UpdaterStatus} from 'reactive-di'
import {abstract} from 'reactive-di/annotations'

import {RouterManager} from 'modern-router'
import {EventHelper} from 'rdi-helpers'
import {ServerStatusView} from 'rdi-ui-common'

import NavTheme from './NavTheme'

@abstract
export class SavingStatus extends UpdaterStatus {}

interface NavState {
    rm: RouterManager;
    theme: NavTheme;
    helper: EventHelper;
    status: SavingStatus;
}


export default function NavView(
    props: {},
    {
        status,
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
        <div className={theme.statusWrapper}><ServerStatusView status={status}/></div>
    </nav>
}
