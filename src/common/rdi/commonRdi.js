/* @flow */
import type {
    ILoadingPage,
    IErrorPage,
    IErrorableElement,

    AnonymFetch,
    EventHelper
} from 'reactive-di-todomvc/common/i'

import type {Tr} from 'any-translate'

import _ from 'babel-plugin-transform-metadata/_'

import type {ConfigItem} from 'reactive-di'

import FetcherConfig from 'reactive-di-todomvc/common/models/FetcherConfig'

import EventHelperImpl from 'reactive-di-todomvc/common/helpers/EventHelper'

import LoadingPage from 'reactive-di-todomvc/common/components/LoadingPage'
import ErrorPage from 'reactive-di-todomvc/common/components/ErrorPage'
import ErrorableElement from 'reactive-di-todomvc/common/components/ErrorableElement'

import Translations from 'reactive-di-todomvc/common/models/Translations'
import tr from 'reactive-di-todomvc/common/services/tr'

import anonymFetch from 'reactive-di-todomvc/common/services/anonymFetch'

const deps: Array<ConfigItem> = [
    [(_: Tr), tr],
    [(_: AnonymFetch), anonymFetch],
    Translations,
    FetcherConfig,
    [(_: EventHelper), EventHelperImpl],
    [(_: IErrorableElement), ErrorableElement],
    [(_: ILoadingPage), LoadingPage],
    [(_: IErrorPage), ErrorPage]
];

export default deps
