/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'

type BaseEnvRec = {
    href?: string;
}

class BaseEnv {
    href: string;

    constructor(rec: BaseEnvRec) {
        this.href = rec.href || ''
    }
}

export default rdi.model(BaseEnv)
