/* @flow */

import rdi from '../common/annotations'

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
