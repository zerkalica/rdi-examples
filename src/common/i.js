/* @flow */

import type {
    Component,
    Element as ReactElement
} from 'react'

export type DummyComponent = Class<Component<void, void, void>>;
export type FlowFix<Props = mixed> = Class<Component<void, Props, void>>;

export type Element = ReactElement;
export interface FetchParams<V: Object> {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    json?: V;
}

export type Fetch<V> = (url: string, params: FetchParams) => Promise<V>;
export type AnonymFetch<V> = (url: string, params: FetchParams) => Promise<V>;

export type EventHandler<V> = (value: V) => void;

export interface EventHelper {
    click<V>(func: EventHandler<V>, value: V): (e: Event) => void;
    change(func: (value: string) => void): (e: Event) => void;
    keyMap(map: Array<[number, EventHandler, any]>): (e: SyntheticKeyboardEvent) => void;
}

export type IsDebug = boolean;

export type ErrorableElementProps = {
    error?: DummyComponent|string;
    children?: Element;
}

export type IErrorableElement = FlowFix<ErrorableElementProps>;

export type ErrorPageProps = {
    error: Error;
}
export type IErrorPage = FlowFix<ErrorPageProps>;
export type ILoadingPage = FlowFix;
