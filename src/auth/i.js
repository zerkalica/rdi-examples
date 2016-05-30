/* @flow */
import type {
    FlowFix,
    Element,
    AnonymFetch
} from 'reactive-di-todomvc/common/i'

import LoginData from 'reactive-di-todomvc/auth/models/LoginData'

import type {
    Meta
} from 'reactive-di-observable'

export type AuthFetch<V> = AnonymFetch<V>;
export type ResetSession = () => void;

export type ChangeLoginData = (props: $Shape<LoginData>) => void;
export type Login = (props: LoginData) => void;
export type Logout = () => void;
export type AuthAreaProps = {
    children?: Element;
}
export type IAuthArea = FlowFix<AuthAreaProps>;
export type ILoginPage = FlowFix;

export type AuthMeta = Meta
