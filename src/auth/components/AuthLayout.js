/* @flow */

import type {
    Element,
    IErrorPage,
    ILoadingPage,
    ICommonLayout
} from 'reactive-di-todomvc/common/i'

import type {
    AuthLayoutProps,
    ILoginPage,
    ILogoutButton,
    Login,
    Logout
} from 'reactive-di-todomvc/auth/i'

import Session from 'reactive-di-todomvc/auth/models/Session'
import LoginPageImpl from 'reactive-di-todomvc/auth/components/LoginPage'
import LogoutButtonImpl from 'reactive-di-todomvc/auth/components/LogoutButton'
import LoginErrors from 'reactive-di-todomvc/auth/models/LoginErrors'

import login from 'reactive-di-todomvc/auth/actions/login'
import logout from 'reactive-di-todomvc/auth/actions/logout'

import {
    component,
    meta
} from 'reactive-di-observable/annotations'

import _ from 'babel-plugin-transform-metadata/_'

@meta(
    Session,
    (_: Login),
    (_: Logout)
)
class AuthMeta {
    pending: boolean;
    success: boolean;
    error: ?Error;
}

type AuthLayoutDeps = AuthLayoutProps & {
    session: Session;
    LoginPage: ILoginPage;
    LogoutButton: ILogoutButton;
    LoadingPage: ILoadingPage;
    CommonLayout: ICommonLayout;
    authMeta: AuthMeta;
    ErrorPage: IErrorPage;
}

export default function AuthLayout({
    session,
    authMeta,
    ErrorPage,
    LoginPage,
    LogoutButton,
    LoadingPage,
    CommonLayout,
    children
}: AuthLayoutDeps): Element {
    if (authMeta.error) {
        return <ErrorPage error={authMeta.error}/>
    }
    if (!children) {
        return <ErrorPage error={new Error('Children is not passed to AuthLayout')}/>
    }
    if (authMeta.pending) {
        return <LoadingPage />
    }

    if (!session.isAuthorized) {
        return <LoginPage/>
    }

    return (
        <CommonLayout>
            <section className="authlayout-header">
                <LogoutButton/>
            </section>
            {children}
        </CommonLayout>
    )
}
component([
    AuthMeta,
    LoginErrors,
    [(_: ILogoutButton), LogoutButtonImpl],
    [(_: Login), login],
    [(_: Logout), logout],
    [(_: ILoginPage), LoginPageImpl]
])(AuthLayout)
