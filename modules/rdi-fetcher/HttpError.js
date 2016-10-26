// @flow

import Err from 'es6-error'

export default class HttpError extends Err {
    statusCode: number
    message: string
    errorType: ?string

    constructor(statusCode: number, message: string, errorType?: ?string) {
        super(message)
        this.statusCode = statusCode
        this.errorType = errorType || null
    }
}
