/* @flow */

import type {
    Element,
    IErrorPage,
    ILoadingPage
} from 'reactive-di-todomvc/common'

import type {
    AuthAreaProps,
    ILoginPage,
    Login,
    Logout
} from 'reactive-di-todomvc/auth'

import Session, {LoadableSession} from 'reactive-di-todomvc/auth/models/Session'
import {component} from 'reactive-di-react/annotations'

import {
    meta
} from 'reactive-di-observable/annotations'

import _ from 'babel-plugin-transform-metadata/_'

@meta(
    LoadableSession,
    (_: Login),
    (_: Logout)
)
class AuthMeta {
    pending: boolean;
    success: boolean;
    error: ?Error;
}

type AuthAreaDeps = AuthAreaProps & {
    session: Session;
    LoginPage: ILoginPage;
    LoadingPage: ILoadingPage;
    sessionMeta: AuthMeta;
    ErrorPage: IErrorPage;
}

export default function AuthArea({
    session,
    sessionMeta,
    ErrorPage,
    LoginPage,
    LoadingPage,
    children
}: AuthAreaDeps): Element {
    if (sessionMeta.pending) {
        return <LoadingPage/>
    }
    if (sessionMeta.error) {
        return <ErrorPage error={sessionMeta.error}/>
    }
    return session.isAuthorized ? children : <LoginPage/>
}
component()(AuthArea)
