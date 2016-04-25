/* @flow */

import type {RouterManager} from 'modern-router/i/routerInterfaces'

export function showAll(rm: RouterManager): void {
    rm.update(null, {
        group: 'all'
    })
}

export function showActive(rm: RouterManager): void {
    rm.update(null, {
        group: 'active'
    })
}

export function showCompleted(rm: RouterManager): void {
    rm.update(null, {
        group: 'completed'
    })
}
