/* @flow */

import type {
    EventHelper,
    Element
} from 'reactive-di-todomvc/common/i'

import type {
    Logout
} from 'reactive-di-todomvc/auth/i'

import type {Tr} from 'any-translate'

import {component} from 'reactive-di-observable/annotations'

type TodoMainPageWrapperProps = {
    t: Tr;
    helper: EventHelper;
    logout: Logout;
}

export default function LogoutPage({
    logout,
    t,
    helper
}: TodoMainPageWrapperProps): Element {
    return (
        <div>
            <div>
                <button onClick={helper.click(logout)}>{t('Logout')}</button>
            </div>
        </div>
    )
}
component()(LogoutPage)
