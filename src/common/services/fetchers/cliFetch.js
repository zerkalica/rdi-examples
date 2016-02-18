/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

import type {Fetch} from 'reactive-di-todomvc/i/commonInterfaces'
function createCliFetch(): Fetch {
    return window.fetch
}
export default rdi.factory()(createCliFetch)
