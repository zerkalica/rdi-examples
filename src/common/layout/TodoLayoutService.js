// @flow

export default class TodoLayoutService {
    _isFirstRun: boolean = true

    isFirstRun(): boolean {
        const result = this._isFirstRun
        this._isFirstRun = false

        return result
    }
}
