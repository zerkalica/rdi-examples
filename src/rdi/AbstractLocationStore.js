// @flow

export default class AbstractLocationStore {
    location(key: string, value?: string): string {
        throw new Error('implement')
    }
}
