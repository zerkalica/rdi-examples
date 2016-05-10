/* @flow */
import type {Dependency} from 'reactive-di/i/coreInterfaces'

import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import storageFetch from 'reactive-di-todomvc/common/services/fetchers/storageFetch'

import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'

import EventHelper from 'reactive-di-todomvc/common/helpers/EventHelper'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'

import Translations from 'reactive-di-todomvc/common/models/Translations'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Dependency> = [
    tr,
    storageFetch,
    Fetcher,

    Translations,
    FetcherConfig,

    EventHelper,

    ErrorableElement,
    LoadingPage,
    ErrorPage
];

export default deps
