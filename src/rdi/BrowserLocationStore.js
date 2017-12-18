// @flow
import {mem} from 'lom_atom'
import AbstractLocationStore from './AbstractLocationStore'

export default class BrowserLocationStore extends AbstractLocationStore {
    _location: Location
    _history: History
    _ns: string

    constructor(location: Location, history: History, ns?: string = 'rdi_app') {
        super()
        this._ns = ns
        this._location = location
        this._history = history
    }

    _params(): URLSearchParams {
        return new URLSearchParams(this._location.search)
    }

    @mem.key.manual location(key: string, value?: string): string {
        const params = this._params()
        if (value === undefined) return params.get(key)

        params.set(key, value)
        this._history.pushState(null, this._ns, `?${params.toString()}`)

        return value
    }
}
