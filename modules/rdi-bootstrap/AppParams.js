// @flow

import {Route} from 'modern-router'

export default class AppParams {
    page: string

    constructor(route: Route) {
        this.page = route.page || ''
    }
}
