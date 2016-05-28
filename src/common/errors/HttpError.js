/* @flow */
import Err from 'es6-error'

export default class HttpError extends Err {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        super(message)
        this.code = code
    }
}
