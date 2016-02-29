/* @flow */
import rdi from 'reactive-di-todomvc/common/annotations'
import type {AnyAnnotation} from 'reactive-di/i/annotationInterfaces'

import Fetcher from 'reactive-di-todomvc/common/services/Fetcher'
import AbstractRouterManager from 'reactive-di-todomvc/common/services/AbstractRouterManager'
import AbstractStorage from 'reactive-di-todomvc/common/services/AbstractStorage'
import storageFetch from 'reactive-di-todomvc/common/services/fetchers/storageFetch'

import CommonState from 'reactive-di-todomvc/common/models/CommonState'
import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'
import BaseEnv from 'reactive-di-todomvc/common/models/BaseEnv'
import BaseQuery from 'reactive-di-todomvc/common/models/BaseQuery'

import LoadableBaseQuery from 'reactive-di-todomvc/common/loaders/LoadableBaseQuery'

import EventHelperImpl from 'reactive-di-todomvc/common/helpers/EventHelperImpl'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import NotFoundPage from 'reactive-di-todomvc/common/components/NotFoundPage'

const {model, factory, klass, react, loader} = rdi

const deps: Array<AnyAnnotation> = [
    factory(storageFetch, AbstractStorage),
    klass(Fetcher, FetcherConfig, storageFetch),

    model(CommonState),
    model(BaseEnv),
    model(BaseQuery),
    model(FetcherConfig),

    loader(LoadableBaseQuery, BaseQuery, AbstractRouterManager),

    factory(EventHelperImpl),

    react(LoadingPage),
    react(NotFoundPage)
];

export default deps
