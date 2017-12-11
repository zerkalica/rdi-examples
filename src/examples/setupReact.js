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

const stackId = Symbol('stack_id')
function ErrorableView({
    error,
    children
}: {
    children: any,
    error: Error
}) {
    const errorWasShowed = (error: Object)[stackId]
    ;(error: Object)[stackId] = true
    const isWait = error instanceof AtomWait
    return <SpinnerView id="errorable" isError={!isWait}>
        {isWait || errorWasShowed
            ? <div id="content" style={{pointerEvents: 'none'}}>{children}</div>
            : <div id="error" style={{padding: '0.1em 1em'}}>
                <h3 id="error-title">{error.message}</h3>
                {error instanceof HttpError
                    ? <div id="recover" style={{paddingBottom: '1em'}}>
                        <button id="recover-button" onClick={error.retry}>Retry</button>
                    </div>
                    : null
                }
            </div>
        }
    </SpinnerView>
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
