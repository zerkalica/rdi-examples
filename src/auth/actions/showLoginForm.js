/* @flow */

import type {RouterManager} from 'modern-router'

export default function showLoginForm(rm: RouterManager): void {
    rm.update('LoginPage', {
        _back: rm.resolve().page
    })
}
