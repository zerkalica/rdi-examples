/* @flow */

import type {
    Component,
    Element as ReactElement
} from 'react'

declare module 'reactive-di-todomvc/common' {
    declare type DummyComponent = Class<Component<void, void, void>>;
    declare type FlowFix<Props> = Class<Component<void, Props, void>>;

    declare type Element = ReactElement;
    declare interface FetchParams<V: Object> {
        method: 'GET' | 'PUT' | 'POST' | 'DELETE';
        json?: V;
    }

    declare type Fetch<V> = (url: string, params: FetchParams) => Promise<V>;
    declare type AnonymFetch<V> = (url: string, params: FetchParams) => Promise<V>;

    declare type EventHandler<V> = (value: V) => void;

    declare interface EventHelper {
        click<V>(func: EventHandler<V>, value: V): (e: Event) => void;
        change(func: (value: string) => void): (e: Event) => void;
        keyMap(map: Array<[number, EventHandler, any]>): (e: SyntheticKeyboardEvent) => void;
    }

    declare type IsDebug = boolean;

    declare type ErrorableElementProps = {
        error?: DummyComponent;
    }
    declare type IErrorableElement = FlowFix<ErrorableElementProps>;

    declare type ErrorPageProps = {
        error: Error;
    }
    declare type IErrorPage = FlowFix<ErrorPageProps>;
    declare type ILoadingPage = FlowFix<void>;
}
