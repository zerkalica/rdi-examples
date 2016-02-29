/* @flow */

import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'

export default function LoadableBaseQuery(
    query: BaseQuery,
    rm: AbstractRouterManager
): Observable<BaseQuery, Error> {
    return rm.locationChanges
}
