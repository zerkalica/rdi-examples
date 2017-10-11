// @flow
import {mem, ConsoleLogger, defaultContext} from 'lom_atom'
import {createReactWrapper, createCreateElement, Injector} from 'reactive-di'

import {h, Component} from 'preact'
import 'preact/devtools'
import {create as createJss} from 'jss'
import jssCamel from 'jss-camel-case'
import jssGlobal from 'jss-global'
import jssNested from 'jss-nested'

import {BrowserLocationStore, AbstractLocationStore} from './common-todomvc'
import Fetcher from '../Fetcher'

const logger = new ConsoleLogger()
defaultContext.setLogger(logger)

function ErrorableView({
    error
}: {
    error: Error
}) {
    return <div>
        {error instanceof mem.Wait
            ? <div>
                Loading...
            </div>
            : <div>
                <h3>Fatal error !</h3>
                <div>{error.message}</div>
                <pre>
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
        [Fetcher, new Fetcher('/api')],
        [AbstractLocationStore, new BrowserLocationStore(location, history)]
    ],
    (jss: any)
)


const lomCreateElement = createCreateElement(
    createReactWrapper(
        Component,
        ErrorableView,
        injector
    ),
    h
)
global['lom_h'] = lomCreateElement
