/* @flow */

import type {RouterManager} from 'modern-router/i/routerInterfaces'

import {compose} from 'reactive-di/configurations'

export function showAll(rm: RouterManager): void {
    rm.update(null, {
        group: 'all'
    })
}
compose(showAll)

export function showActive(rm: RouterManager): void {
    rm.update(null, {
        group: 'active'
    })
}
compose(showActive)

export function showCompleted(rm: RouterManager): void {
    rm.update(null, {
        group: 'completed'
    })
}
compose(showCompleted)
