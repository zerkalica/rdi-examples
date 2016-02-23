/* @flow */

export type FetchParams<V: Object> = {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    json?: V;
}

export type Fetch<V> = (url: string, params: FetchParams) => Promise<V>;
