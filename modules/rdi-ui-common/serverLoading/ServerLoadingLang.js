// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

@source({key: 'ServerLoadingLang'})
export default class ServerLoadingLang extends BaseModel {
    errorLoading: string
    retry: string
    noAuthorized: string
    accessDenied: string

    static defaults = {
        errorLoading: 'Server error: #{message}',
        retry: 'Retry',
        noAuthorized: 'Not authorized',
        accessDenied: 'Access denied'
    }

    _getErrorMessage({message, statusCode}: {message: string, statusCode?: number}): string {
        switch (statusCode) {
            case 400:
                return message
            case 401:
                return this.noAuthorized
            case 403:
                return this.accessDenied
            default:
                return `${message}${statusCode ? ` [${statusCode}]` : ''}`
        }
    }

    getMessage(err: Error) {
        return this.errorLoading.replace('#{message}', this._getErrorMessage((err: any)))
    }
}
