// @flow

import {mem} from 'lom_atom'
import {props} from 'reactive-di'

interface IHelloProps {
    initialValue: string;
}

class HelloContext {
    @mem name: string
    @props set props({initialValue}: IHelloProps) {
        this.name = initialValue
    }
    @mem get greet() {
        return 'Hello, ' + this.name
    }
}

export function HelloView(
    _: IHelloProps,
    {context}: {context: HelloContext}
) {
    return <div rdi_theme>
        {context.greet}
        <br id="br"/><input id="input" value={context.name} onInput={({target}) => {
            context.name = (target: any).value
        }} />
    </div>
}
