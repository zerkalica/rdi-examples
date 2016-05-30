/* @flow */
import type LoginData from 'reactive-di-todomvc/auth/models/LoginData'

import {observable} from 'reactive-di-observable/annotations'

@observable()
export default class LoginErrors {
    name: string;
    password: string;

    isError: boolean;

    constructor(data?: LoginData) {
        let name: string = '';
        let password: string = '';
        let isError: boolean = false;
        if (data) {
            if (!data.name) {
                isError = true
                name = 'name is required'
            }
            if (!data.password) {
                isError = true
                password = 'password is required'
            }
        }

        this.isError = isError
        this.name = name
        this.password = password
    }
}
