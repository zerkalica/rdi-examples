/* @flow */
import type {
    Tr,
    Fetch,
    EventHelper,
    ErrorableElement
} from 'reactive-di-todomvc/i/commonInterfaces'

import _ from 'babel-plugin-transform-metadata/_'

import {
    factory,
    klass
} from 'reactive-di/configurations'
import {
    observable
} from 'reactive-di-observable/configurations'

import {component} from 'reactive-di-react'

import type {Annotation} from 'reactive-di/i/coreInterfaces'

import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import storageFetch from 'reactive-di-todomvc/common/services/fetchers/storageFetch'

import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'

import EventHelperImpl from 'reactive-di-todomvc/common/helpers/EventHelper'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import ErrorableElementImpl from 'reactive-di-todomvc/common/components/ErrorableElement'

import Translations from 'reactive-di-todomvc/common/models/Translations'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Annotation> = [
    [(_: Tr), factory(tr)],
    [(_: Fetch), factory(storageFetch)],
    klass(Fetcher),

    observable(Translations),
    observable(FetcherConfig),

    [(_: EventHelper), klass(EventHelperImpl)],
    [(_: ErrorableElement), component(ErrorableElementImpl)],

    component(LoadingPage),
    component(ErrorPage)
];

export default deps
