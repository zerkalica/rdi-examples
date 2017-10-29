// @flow

import {mem, force} from 'lom_atom'
import {props} from 'reactive-di'
import {ItemView, Locale} from './common'

class Hello {
    @mem name = 'test'
}

interface IHelloProps {
    name: string;
}

class HelloOptions {
    @mem @props _props: IHelloProps

    @mem get actionName(): string {
        return this._props.name + '-hello'
    }
    @mem set actionName(name: string) {}
}

class SomeService {
    _opts: HelloOptions
    constructor(opts: HelloOptions) {
        this._opts = opts
    }

    value() {
        return this._opts.actionName + '-srv'
    }
}

type HelloState = {
}

export function HelloView(
    _: IHelloProps,
    {locale, options, service, hello}: {
        locale: Locale,
        options: HelloOptions,
        service: SomeService,
        hello: Hello
    }
) {
    return <div>
        <h3>{options.actionName}, {hello.name}</h3>
        <ItemView>
            <ItemView.Key>Lang:</ItemView.Key>
            <ItemView.Value>{locale.lang}</ItemView.Value>
        </ItemView>

        <ItemView>
            <ItemView.Key>Srv:</ItemView.Key>
            <ItemView.Value>{service.value()}</ItemView.Value>
        </ItemView>

        <ItemView>
            <ItemView.Key>Name:</ItemView.Key>
            <ItemView.Value><input value={hello.name} onInput={({target}: Event) => {
                hello.name = (target: any).value
            }} /></ItemView.Value>
        </ItemView>

        <ItemView>
            <ItemView.Key>Action:</ItemView.Key>
            <ItemView.Value><input value={options.actionName} onInput={({target}: Event) => {
                options.actionName = (target: any).value
            }} /></ItemView.Value>
        </ItemView>
    </div>
}
