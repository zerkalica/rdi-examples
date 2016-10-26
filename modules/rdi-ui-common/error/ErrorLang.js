// @flow

import {BaseModel} from 'reactive-di'
import {source} from 'reactive-di/annotations'

import {QueryError} from 'rdi-helpers'
import {PageNotFoundError} from 'modern-router'

@source({key: 'ErrorLang'})
export default class ErrorLang extends BaseModel<Object> {
    pageError: string
    errorInQueryParams: string
    pageNotFound: string
    unknownError: string

    static defaults: Object = {
        pageError: 'Error',
        errorInQueryParams: 'Error in query',
        pageNotFound: 'Page not found: #{pageName}',
        unknownError: 'Unknown error'
    }

    getPageNotFound(error: Error): string {
        let message: string = this.unknownError
        if (error instanceof QueryError) {
            message = this.errorInQueryParams
        } else if (error instanceof PageNotFoundError) {
            message = this.pageNotFound.replace('#{pageName}', error.pageName || 'null')
        }
        return message
    }
}
