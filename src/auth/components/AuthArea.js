/* @flow */

import type {
    Element,
    ILoadingPage
} from 'reactive-di-todomvc/common'

import type {
    AuthMeta,
    AuthAreaProps,
    ILoginPage
} from 'reactive-di-todomvc/auth'

import Session from 'reactive-di-todomvc/auth/models/Session'

type AuthAreaDeps = AuthAreaProps & {
    session: Session;
    LoginPage: ILoginPage;
    LoadingPage: ILoadingPage,
    sessionMeta: AuthMeta;
}

export default function AuthArea({
    session,
    sessionMeta,
    LoginPage,
    LoadingPage,
    children
}: AuthAreaDeps): Element {
    if (sessionMeta.pending) {
        return <LoadingPage/>
    }
    return session.isAuthorized ? children : <LoginPage/>
}
