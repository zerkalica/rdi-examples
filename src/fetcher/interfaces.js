// @flow

export type IRequestOptions = RequestOptions & {
    params?: {[id: string]: string};
    requestId: string;
    fullUrl: string;
    url: string;
    retry: () => void;
}

export interface IStateCollector {
    beginFetch(opts: IRequestOptions): void;
    endFetch(data: Error | mixed, opts: IRequestOptions): void;
}

export type IState = {[id: string]: Object | void}

export interface IFetcher {
    +state: IState | void;
    mergeOptions(init: IRequestOptions): IRequestOptions;
    request(opts: IRequestOptions): Promise<Response | string | Error>
}

export interface FetcherApi {
    options(opts: $Shape<IRequestOptions>): FetcherApi;
    text<V: string | Error | FormData>(next?: V): V;
    json<V>(data?: V): V;
}
