/* @flow */

type ConfigStateRec = {
    debug?: string;
}

export default class ConfigState {
    debug: string;
    constructor(rec: ConfigStateRec) {
        this.debug = rec.debug || ''
    }
}
