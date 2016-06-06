/* @flow */

import type {
    EventHelper,
    Element,
    IErrorableElement
} from 'reactive-di-todomvc/common/i'

import type {
    ChangeLoginData,
    Login
} from 'reactive-di-todomvc/auth/i'

import type {Tr} from 'any-translate'

import {component} from 'reactive-di-observable/annotations'

import LoginErrors from 'reactive-di-todomvc/auth/models/LoginErrors'
import LoginData from 'reactive-di-todomvc/auth/models/LoginData'
import {
    KEY_ENTER
} from 'reactive-di-todomvc/common/helpers/keyCodes'
import changeLoginDataImpl from 'reactive-di-todomvc/auth/actions/changeLoginData'

import _ from 'babel-plugin-transform-metadata/_'

type TodoMainPageWrapperProps = {
    t: Tr;
    ErrorableElement: IErrorableElement;
    helper: EventHelper;
    login: Login;
    changeLoginData: ChangeLoginData;
    props: LoginData;
    errors: LoginErrors;
}

export default function LoginPage({
    errors,
    props,
    login,
    t,
    changeLoginData,
    helper,
    ErrorableElement
}: TodoMainPageWrapperProps): Element {
    return (
        <div>
            <div>
                <label forHtml="LoginPage-input-name">{t('Login:')}</label>
                <ErrorableElement error={errors.name}>
                    <input
                        id="LoginPage-input-name"
                        name="LoginPage-input-name"
                        value={props.name}
                        onKeyPress={helper.keyMap([
                            [KEY_ENTER, login, props]
                        ])}
                        onChange={helper.change((name: string) => changeLoginData({name}))}
                    />
                </ErrorableElement>
            </div>
            <div>
                <label forHtml="LoginPage-input-password">{t('Password:')}</label>
                <ErrorableElement error={errors.password}>
                    <input
                        id="LoginPage-input-password"
                        password="LoginPage-input-password"
                        value={props.password}
                        onKeyPress={helper.keyMap([
                            [KEY_ENTER, login, props]
                        ])}
                        onChange={helper.change((password: string) => changeLoginData({password}))}
                    />
                </ErrorableElement>
            </div>
            <div>password: (admin)</div>
            <div>
                <button onClick={helper.click(login, props)}>{t('Continue')}</button>
            </div>
        </div>
    )
}
component([
    LoginData,
    LoginErrors,
    [(_: ChangeLoginData), changeLoginDataImpl]
])(LoginPage)
