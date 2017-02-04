// @flow

import {theme} from 'reactive-di/annotations'
import UIVars from 'rdi-ui-common/models/UIVars'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

@theme
export default class RdiLayoutTheme {
    wrapper: string

    __css: mixed

    constructor(_uiVars: UIVars) {
        this.__css = {
            wrapper: {
            }
        }
    }
}
