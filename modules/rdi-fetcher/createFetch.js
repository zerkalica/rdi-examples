// @flow

export type FetchOptions = RequestOptions
export type Fetch<V> = (url: string, options: FetchOptions) => Promise<V>

export default function createFetch(): Fetch<*> {
    return function customFetch<V>(
        /* eslint-disable */
        url: string,
        options: FetchOptions
    ): Promise<V> {
        throw new Error('implement')
    }
}
