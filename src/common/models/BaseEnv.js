/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import RouterManager from 'reactive-di-todomvc/common/models/RouterManager'

type BaseEnvRec = {
    referrer: string;
    userAgent: string;
    language: string;
    platform: string;
    routerManager: RouterManager;
}

class BaseEnv {
    referrer: string;
    userAgent: string;
    language: string;
    platform: string;
    routerManager: RouterManager;

    constructor(rec: BaseEnvRec) {
        this.referrer = rec.referrer
        this.userAgent = rec.userAgent
        this.language = rec.language
        this.platform = rec.platform
        this.routerManager = rec.routerManager
    }
}

export default rdi.model(BaseEnv)
