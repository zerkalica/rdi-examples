/* @flow */

import type {GetDep} from 'reactive-di/i/diInterfaces'
import type {RootComponentProps} from 'reactive-di-react/i/interfaces'
import {createBindReactState} from 'reactive-di-react'
import createPageFacet from 'reactive-di-todomvc/common/facets/createPageFacet'
import pageMap from 'reactive-di-todomvc/app/pageMap'
import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'

export default function createReactProps(di: GetDep): RootComponentProps {
    const observable = di(createPageFacet(pageMap))
    return {
        page: LoadingPage,
        observable,
        bindReactState: createBindReactState(di)
    }
}
