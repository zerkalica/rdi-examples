// @flow

import {mem, defer, ReactAtom, ConsoleLogger, defaultContext} from 'lom_atom'
import {JssSheetManager, createReactWrapper, createCreateElement, Injector} from 'reactive-di'

import {h, Component} from 'preact'
import 'preact/devtools'

import {create as createJss} from 'jss'
import jssCamel from 'jss-camel-case'
import jssGlobal from 'jss-global'
import jssNested from 'jss-nested'

import BrowserLocationStore from '../rdi/BrowserLocationStore'
import AbstractLocationStore from '../rdi/AbstractLocationStore'

import {Fetcher, HttpError} from '../fetcher'
import {FetcherLom} from '../fetcher/lom'
import ErrorableView from './ErrorableView'

defaultContext.setLogger(new ConsoleLogger())

const themer = new JssSheetManager(createJss({
    createGenerateClassName: JssSheetManager.createGenerateClassName,
    plugins: [
        jssNested(),
        jssCamel(),
        jssGlobal()
    ]
}), defer.add)

const config = [
    [Fetcher, new FetcherLom({baseUrl: '/api'})],
    [AbstractLocationStore, new BrowserLocationStore(location, history, 'rdi_demos')]
]

global['lom_h'] = createCreateElement(
    createReactWrapper(
        Component,
        ErrorableView,
        ReactAtom,
        new Injector(config, themer)
    ),
    (h: React$CreateElement),
    true
)
