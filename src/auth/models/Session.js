/* @flow */

export default class Session {
    isAuthorized: boolean;

    constructor(rec?: {
        isAuthorized?: boolean
    } = {}) {
        this.isAuthorized = rec.isAuthorized || false
    }
}
