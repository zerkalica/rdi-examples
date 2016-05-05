/* @flow */
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
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import storageFetch from 'reactive-di-todomvc/common/services/fetchers/storageFetch'

import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'

import EventHelper from 'reactive-di-todomvc/common/helpers/EventHelper'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'

import Translations from 'reactive-di-todomvc/common/models/Translations'
import tr from 'reactive-di-todomvc/common/services/tr'

const deps: Array<Annotation> = [
    factory(tr, BaseEnv, Translations),
    factory(storageFetch, AbstractStorage),
    klass(Fetcher, FetcherConfig, storageFetch),

    observable(Translations),
    observable(FetcherConfig),

    klass(EventHelper),

    component(ErrorableElement),
    component(LoadingPage),
    component(ErrorPage, {
        props: {
            tr
        }
    })
];

export default deps
