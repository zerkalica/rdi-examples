// @flow

import {mem, action} from 'lom_atom'
import {props} from 'reactive-di'

interface IHelloProps {
    name: string;
    id: string;
}

class HelloContext {
    @mem name: string
    @props set props({name}: IHelloProps) {
        this.name = name
    }
    @mem get greet() {
        return 'Hello, ' + this.name
    }
}

export function HelloView(
    {id}: IHelloProps,
    {context}: {context: HelloContext}
) {
    return <div id={id}>
        {context.greet}
        <br/><input id="input" value={context.name} onInput={({target}) => {
            context.name = (target: any).value
        }} />
    </div>
}
