/* @flow */
import type {
    AnonymFetch
} from 'reactive-di-todomvc/common'

declare module 'reactive-di-todomvc/auth' {
    declare type AuthFetch<V> = AnonymFetch<V>;
    declare type ShowLoginForm = () => void;
}
