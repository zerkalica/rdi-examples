// @flow

import {mem, AtomWait} from 'lom_atom'
import {props} from 'reactive-di'

class HelloAsyncContext {
    @mem name: string = 'test'

    @mem set greet(v: string) {}
    @mem get greet() {
        setTimeout(() => {
            const v = 'HelloAsync, ' + this.name
            mem.cache(this.greet = v)
        }, 200)
        throw new AtomWait()
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
