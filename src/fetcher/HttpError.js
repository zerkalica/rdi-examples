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

/**
 * Can't extend Error
 * @see https://github.com/babel/babel/issues/7447
 */
class HttpError {
    status: ?number
    message: string
    stack: string
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
        const t: HttpError = (Error.call(this, (parent
            ? (parent.message || parent.stack)
            : (response ? response.statusText : null)
        ) || 'unknown'): any)
        if (parent) {
            t.status = (parent: Object).status || null
            t.stack = parent.stack
        } else if (response) {
            t.status = response.status || null
        } else {
            t.status = null
        }
        t.uid = uid ? uid :  ('' + Date.now())
        t.data = data
            ? typeof data === 'object' ? data : safeToJson(data)
            : null

        // $FlowFixMe new.target
        ;(t: Object)['__proto__'] = new.target.prototype
        t._opts = opts

        return t
    }
}

function toJSON() {
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

;(HttpError: any).prototype = Object.create(Error.prototype)
;(HttpError: any).prototype.constructor = HttpError
;(HttpError: any).prototype.toJSON = toJSON

export default ((HttpError: any): Class<HttpError & Error>)
