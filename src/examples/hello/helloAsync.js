// @flow

import {mem} from 'lom_atom'
import {props} from 'reactive-di'

class HelloAsyncContext {
    @mem name: string = 'test'

    @mem set greet(v: string) {}
    @mem get greet() {
        throw new Promise((resolve) => {
            setTimeout(() => {
                resolve('HelloAsync, ' + this.name)
            }, 200)
        })
    }
}

export function HelloAsyncView(
    _: {},
    {context}: {context: HelloAsyncContext}
) {
    return <div rdi_theme>
        {context.greet}
        <br id="br"/><input id="input" value={context.name} onInput={({target}) => {
            context.name = (target: any).value
        }} />
    </div>
}
