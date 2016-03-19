/* @flow */
import Err from 'es6-error'

export default class QueryError extends Err {
    field: string;

    constructor(field: string, message: string) {
        super(message)
        this.field = field
    }
}
