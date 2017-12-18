// @flow

import type {IRequestOptions} from './interfaces'

function safeToJson(v: string): Object {
    let data: Object
    try {
        data = JSON.parse(v)
    } catch (e) {
        data = {valueOf: () => v }
    }
    return data
}

export default class HttpError extends Error {
    status: ?number
    message: string
    stack: string
    retry: () => void
    uid: string
    data: ?Object
    _opts: IRequestOptions

    constructor(
        {opts, parent, response, data, uid}: {
            opts: IRequestOptions,
            parent: ?Error,
            response?: Response,
            data?: Object | string,
            uid?: string
        }
    ) {
        super((parent
            ? (parent.message || parent.stack)
            : (response ? response.statusText : null)
        ) || 'unknown')
        if (parent) {
            this.status = (parent: Object).status || null
            this.stack = parent.stack
        } else if (response) {
            this.status = response.status || null
        } else {
            this.status = null
        }
        this.uid = uid ? uid :  ('' + Date.now())
        this.data = data
            ? typeof data === 'object' ? data : safeToJson(data)
            : null

        // $FlowFixMe new.target
        ;(this: Object)['__proto__'] = new.target.prototype
        this._opts = opts
        this.retry = opts.retry
    }

    toJSON() {
        const opts = this._opts
        return {
            uid: this.uid,
            message: this.message,
            stack: this.stack,
            status: this.status,
            request: {
                requestId: opts.requestId,
                url: opts.fullUrl,
                method: opts.method || 'GET',
                body: opts.body ? String(opts.body) : null,
            },
            data: this.data
        }
    }
}
