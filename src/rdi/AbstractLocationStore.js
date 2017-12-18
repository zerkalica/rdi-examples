// @flow

export default class AbstractLocationStore {
    toUrl(newParams: {[id: string]: string}, hash?: string): string {
        throw new Error('implement')
    }
    location(key: string, value?: string): string {
        throw new Error('implement')
    }
}
