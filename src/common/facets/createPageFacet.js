/* @flow */

import rdi from '../annotations'
import BaseQuery from './BaseQuery'

export default function createPageFacet(
    pageMap: {[id: string]: Class<ReactComponent>}
): (query: BaseQuery) => Class<ReactComponent> {
    function PageFacet(query: BaseQuery): Class<ReactComponent> {
        return pageMap[query.page] || pageMap._
    }
    return rdi.factory(BaseQuery)(PageFacet)
}
