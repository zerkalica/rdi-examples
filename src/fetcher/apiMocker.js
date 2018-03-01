// @flow

interface FetchMock {
    mock(mock: Mock): void;
}
type MockResponse = (url: string, params: RequestOptions, ...args: string[]) => Object | Array<*>
type Mock = {
    method: string;
    matcher: RegExp;
    response: MockResponse;
}
type MockCreator = (storage: Storage) => Mock[]

global['rdi_fetch_error_rate'] = undefined

function delayed(
    mock: Mock,
    delay: number,
    errorRate: number,
    fakeErrorText: string
): (url: string, params: RequestOptions) => Promise<MockResponse> {
    return function resp(url: string, params: RequestOptions) {
        return new Promise((resolve: (v: MockResponse) => void, reject: (e: Error) => void) => {
            setTimeout(() => {
                const globalRate: number | void = global['rdi_fetch_error_rate']
                const rate = 100 - (globalRate == undefined ? errorRate : globalRate)
                if (Math.floor(Math.random() * 100) > rate) {
                    reject(new Error(fakeErrorText))
                } else {
                    resolve((url: string, params: RequestOptions) =>
                        mock.response(
                            url,
                            params,
                            ...(url.match(mock.matcher) || []).slice(1)
                        )
                    )
                }
            }, delay)
        })
    }
}

export default function apiMocker(
    {
        fetchMock,
        mocks,
        storage = localStorage,
        delay = 500,
        errorRate = 30,
        fakeErrorText = '500 Fake HTTP Error'
    }: {
        fetchMock: FetchMock;
        mocks: MockCreator[];
        storage?: Storage;
        delay?: number;
        errorRate?: number;
        fakeErrorText?: string;
    }
): void {
    mocks.forEach(createMock => {
        createMock(storage).forEach(data => {
            fetchMock.mock({
                ...data,
                response: delayed(data, delay, errorRate, fakeErrorText)
            })
        })
    })
}
