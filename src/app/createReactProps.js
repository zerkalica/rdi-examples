/* @flow */

import type {GetDep} from 'reactive-di/i/diInterfaces'
import type {StatefullObservable} from 'reactive-di/i/statefullObservable'
import type {RootComponentProps} from 'reactive-di-react/i/interfaces'
import {createBindReactState} from 'reactive-di-react'
import createPageFacet from 'reactive-di-todomvc/common/facets/createPageFacet'
import pageMap from 'reactive-di-todomvc/app/pageMap'

export default function createReactProps(di: GetDep): RootComponentProps {
    const {initialData, observable}: StatefullObservable = di(createPageFacet(pageMap)); // eslint-disable-line

    return {
        page: initialData.page,
        observable,
        bindReactState: createBindReactState(di)
    }
}
