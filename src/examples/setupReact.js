// @flow
import {mem, AtomWait, detached, ConsoleLogger, defaultContext} from 'lom_atom'
import {createReactWrapper, createCreateElement, Injector} from 'reactive-di'

import {h, Component} from 'preact'
import 'preact/devtools'
import {create as createJss} from 'jss'
import jssCamel from 'jss-camel-case'
import jssGlobal from 'jss-global'
import jssNested from 'jss-nested'

import {BrowserLocationStore, AbstractLocationStore} from './common-todomvc'
import {SpinnerView} from './common'

import Fetcher from '../Fetcher'

defaultContext.setLogger(new ConsoleLogger())

function ErrorableView({
    error
}: {
    error: Error
}) {
    return <div id="errorable">
        {error instanceof AtomWait
            ? <SpinnerView id="loading"/>
            : <div id="error">
                <h3 id="title">Fatal error !</h3>
                <div id="message">{error.message}</div>
                <pre id="stack">
                    {error.stack.toString()}
                </pre>
            </div>
        }
    </div>
}

const jss = createJss({
    plugins: [
        jssNested(),
        jssCamel(),
        jssGlobal()
    ]
})

const injector = new Injector(
    [
        [Fetcher, new Fetcher({baseUrl: '/api'})],
        [AbstractLocationStore, new BrowserLocationStore(location, history)]
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
