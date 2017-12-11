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

import {Fetcher, HttpError} from '../fetcher'

defaultContext.setLogger(new ConsoleLogger())

function ErrorableView({
    error,
    children
}: {
    children: any,
    error: Error
}) {
    return <div id="errorable">
        {error instanceof AtomWait
            ? <SpinnerView id="loading">{children}</SpinnerView>
            : <div id="error">
                <h3 id="error-title">{error.message}</h3>
                {error instanceof HttpError
                    ? <div id="recover">
                        <button id="recover-button" onClick={error.retry}>Retry</button>
                    </div>
                    : null
                }
                <pre id="stack">
                    {String(error.stack || error)}
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
