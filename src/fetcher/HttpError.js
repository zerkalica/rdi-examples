// @flow

import type {IRequestOptions} from './interfaces'

export default class HttpError extends Error {
    statusCode: ?number
    message: string
    stack: string
    retry: () => void
    uid: string

    _opts: IRequestOptions

    constructor(
        parent: Error,
        opts: IRequestOptions
    ) {
        super(parent.message || parent.stack)
        // $FlowFixMe new.target
        ;(this: Object)['__proto__'] = new.target.prototype
        this.stack = parent.stack
        this.uid = (parent: Object).uid || ('' + Date.now())
        this._opts = opts
        this.statusCode = (parent: Object).statusCode || null
        this.retry = opts.retry
    }

    toString(): string {
        return JSON.stringify(this.toJSON(), null, '\t')
    }

    get displayName(): string {
        return this.toString()
    }

    toJSON() {
        const opts = this._opts
        return {
            request: {
                requestId: opts.requestId,
                url: opts.fullUrl,
                method: opts.method || 'GET',
                body: opts.body ? String(opts.body) : null,
            },
            error: {
                uid: this.uid,
                message: this.message,
                stack: this.stack,
                statusCode: this.statusCode
            }
        }
    }
}
