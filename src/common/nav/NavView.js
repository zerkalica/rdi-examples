// @flow

import {SourceStatus} from 'reactive-di'
import {abstract} from 'reactive-di/annotations'

import {RouterManager} from 'modern-router'
import {EventHelper} from 'rdi-helpers'
import {ServerStatusView} from 'rdi-ui-common'

import NavTheme from './NavTheme'
import NavLang from './NavLang'

@abstract
export class SavingStatus extends SourceStatus {}

interface NavState {
    rm: RouterManager;
    theme: NavTheme;
    helper: EventHelper;
    status: SavingStatus;
    lang: NavLang;
}

export default function NavView(
    props: {},
    {
        status,
        theme,
        rm,
        helper,
        lang
    }: NavState
) {
    return <nav className={theme.wrapper}>
        <div className={theme.content}>
            <ul className={theme.block}>
                <li className={theme.active}>
                    <a
                        className={theme.link}
                        onClick={helper.click(() => {})}
                        href={rm.build('TodosPage', {group: 'all'})}
                    >{lang.todos}</a>
                </li>
            </ul>
            <span className={theme.statusWrapper}><ServerStatusView noRetry status={status}/></span>
        </div>
    </nav>
}
