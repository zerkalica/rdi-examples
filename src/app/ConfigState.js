/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

type ConfigStateRec = {
    debug?: string;
}

class ConfigState {
    debug: string;
    constructor(rec: ConfigStateRec) {
        this.debug = rec.debug || ''
    }

}

export default rdi.model(ConfigState)
