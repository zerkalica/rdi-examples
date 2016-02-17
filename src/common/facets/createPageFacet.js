/* @flow */

import rdi from 'reactive-di-todomvc/common/annotations'
import BaseQuery from 'reactive-di-todomvc/common/facets/BaseQuery'
import type {PageMap} from 'reactive-di-todomvc/i/PageMap'

export default function createPageFacet(pageMap: PageMap): Function {
    function PageFacet(query: BaseQuery): Class<ReactComponent> {
        return pageMap[query.page] || pageMap._
    }
    return rdi.observable({
        page: rdi.factory(BaseQuery)(PageFacet)
    })
}
