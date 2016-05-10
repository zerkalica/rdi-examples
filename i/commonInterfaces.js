/* @flow */

import {Component} from 'react'

export type FetchParams<V: Object> = {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    json?: V;
}

export type Fetch<V> = (url: string, params: FetchParams) => Promise<V>;

export type EventHandler<V> = (value: V) => void;

export type EventHelper = {
    click<V>(func: EventHandler<V>, value: V): (e: Event) => void;
    change(func: (value: string) => void): (e: Event) => void;
    keyMap(map: Array<[number, EventHandler, any]>): (e: SyntheticKeyboardEvent) => void;
}

export type Tr = (message: string, params?: {[id: string]: number|string|Object|Function})
    => Array<string|Object|Function>|string;

export type IErrorableElement = Class<React$Component<void, {
    error: ?string;
}, void>>
