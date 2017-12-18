// @flow

import './mocks'

import {mem, AtomWait, detached, ConsoleLogger, defaultContext} from 'lom_atom'
import {createReactWrapper, createCreateElement, Injector} from 'reactive-di'

import {render, h, Component} from 'preact'
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
import AppView from './AppView'

defaultContext.setLogger(new ConsoleLogger())

const jss = createJss({
    plugins: [
        jssNested(),
        jssCamel(),
        jssGlobal()
    ]
})

const injector = new Injector(
    [
        [Fetcher, new FetcherLom({baseUrl: '/api'})],
        [AbstractLocationStore, new BrowserLocationStore(location, history, 'rdi_demos')]
    ],
    (jss: any)
)

const lomCreateElement = createCreateElement(
    createReactWrapper(
        Component,
        ErrorableView,
        detached,
        injector
    ),
    (h: React$CreateElement),
    true
)
global['lom_h'] = lomCreateElement

const el = document.getElementById('app')
if (!el) throw new Error('Document has no #app container')

render(<AppView id="demos" lang="ru" />, el)
