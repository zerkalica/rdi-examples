// @flow

export type FetchOptions = {
    body?: ?(Blob | FormData | URLSearchParams | string | Object);
    cache?: ?CacheType;
    credentials?: ?CredentialsType;
    headers?: ?HeadersInit;
    integrity?: ?string;
    method?: ?MethodType;
    mode?: ?ModeType;
    redirect?: ?RedirectType;
    referrer?: ?string;
    referrerPolicy?: ?ReferrerPolicyType;
}

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
