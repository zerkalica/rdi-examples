/* @flow */
import type {
    DummyComponent,
    FlowFix,
    AnonymFetch
} from 'reactive-di-todomvc/common'

import LoginData from 'reactive-di-todomvc/auth/models/LoginData'

import type {
    Meta
} from 'reactive-di-observable'

export type AuthFetch<V> = AnonymFetch<V>;
export type ResetSession = () => void;

export type ChangeLoginData = (props: LoginData) => void;
export type Login = (props: LoginData) => void;
export type Logout = () => void;
export type AuthAreaProps = {
    children: DummyComponent;
}
export type IAuthArea = FlowFix<AuthAreaProps>;
export type ILoginPage = FlowFix<void>;

export type AuthMeta = Meta
