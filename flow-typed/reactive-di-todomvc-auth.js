/* @flow */
import type {
    DummyComponent,
    FlowFix,
    AnonymFetch
} from 'reactive-di-todomvc/common'
import type LoginData from 'reactive-di-todomvc/auth/models/LoginData'
import type {
    Meta
} from 'reactive-di-observable'

declare module 'reactive-di-todomvc/auth' {
    declare type AuthFetch<V> = AnonymFetch<V>;
    declare type ResetSession = () => void;

    declare type ChangeLoginData = (props: LoginData) => void;
    declare type Login = (props: LoginData) => void;
    declare type Logout = () => void;
    declare type AuthAreaProps = {
        children: DummyComponent;
    }
    declare type IAuthArea = FlowFix<AuthAreaProps>;
    declare type ILoginPage = FlowFix<void>;

    declare type AuthMeta = Meta
}
