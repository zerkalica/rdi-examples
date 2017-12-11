// @flow

import type {IStateCollector, IState, IRequestOptions} from './interfaces'

type ISuccessCb = (state: IState) => void
type IErrorCb = (e: Error) => void

export default class ServerStateCollector implements IStateCollector {
    _size = 0
    _callbacks: ISuccessCb[] = []
    _errors: IErrorCb[] = []
    _error = false
    _state: IState = {}
    _render: () => void

    constructor(render: () => void) {
        this._render = render
    }

    beginFetch(opts: IRequestOptions) {
        this._size++
    }

    endFetch(data: mixed, opts: IRequestOptions) {
        this._size--
        const url = opts.url
        if (data instanceof Error) {
            this._error = true
        } else if (typeof data === 'string') {
            try {
                this._state[url] = JSON.parse(data)
            } catch (e) {
                console.warn(e)
            }
        }

        if (this._size === 0) {
            if (!this._error) {
                this._render()
            }
            if (this._size === 0) {
                const state = this._state
                const cbs = this._error ? this._errors : this._callbacks
                for (let i = 0; i < cbs.length; i++) {
                    cbs[i]((state: any))
                }
                this._callbacks = []
                this._errors = []
                this._error = false
            }
        }
    }

    then(cb: ISuccessCb): this {
        this._callbacks.push(cb)
        return this
    }

    catch(cb: IErrorCb): this {
        this._errors.push(cb)
        return this
    }

    render(): this {
        this._render()

        return this
    }
}
