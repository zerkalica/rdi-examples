// @flow
import {mem} from 'lom_atom'
import {createReactWrapper, createCreateElement, Injector} from 'reactive-di'

import {h, Component} from 'preact'
import 'preact/devtools'
import {create as createJss} from 'jss'
import jssCamel from 'jss-camel-case'
import jssGlobal from 'jss-global'
import jssNested from 'jss-nested'

import {BrowserLocationStore, AbstractLocationStore} from './common-todomvc'

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

const lomCreateElement = createCreateElement(
    createReactWrapper(
        Component,
        ErrorableView,
        new Injector([
            [AbstractLocationStore, new BrowserLocationStore(location, history)]
        ], jss)
    ),
    h
)
global['lom_h'] = lomCreateElement
