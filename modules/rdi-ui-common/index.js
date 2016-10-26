// @flow

import type {RegisterDepItem} from 'reactive-di'

import RdiLayoutView from './rdiLayout/RdiLayoutView'
import UIVars from './models/UIVars'
import ErrorPage from './error/ErrorPage'
import FallbackPage from './fallback/FallbackPage'
import ServerLoadingView from './serverLoading/ServerLoadingView'
import ErrorableElement from './form/ErrorableElement'

const rdi: RegisterDepItem[] = []

export {
    rdi,
    UIVars,
    ServerLoadingView,
    ErrorPage,
    FallbackPage,
    RdiLayoutView,
    ErrorableElement
}
