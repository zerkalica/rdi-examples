// @flow
import {mem} from 'lom_atom'
import {createReactWrapper, createCreateElement, Injector} from 'reactive-di'
import {h, Component} from 'preact'
import {BrowserLocationStore, AbstractLocationStore} from './todomvc/common-todomvc'

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

const lomCreateElement = createCreateElement(
    createReactWrapper(
        Component,
        ErrorableView,
        new Injector([
            [AbstractLocationStore, new BrowserLocationStore(location, history)]
        ])
    ),
    h
)
global['lom_h'] = lomCreateElement
