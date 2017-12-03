// @flow

import {mem, AtomWait} from 'lom_atom'
import {cloneComponent} from 'reactive-di'

class FirstCounterService {
    lang = {
        add: 'Add',
        error: 'Gen error'
    }
    @mem get value(): number {
        setTimeout(() => {
            mem.cache(this.value = 1)
            // this.value = new Error('loading error')
        }, 500)

        throw new AtomWait()
    }

    @mem set value(v: number | Error) {
        if (typeof v === 'string') {
            throw new TypeError('Test error')
        }
    }
}

function CounterMessageView(
    {value}: {
        value: number
}) {
    return <div>
        Count: {value}
    </div>
}

function FirstCounterView(
    _: {},
    counter: FirstCounterService
) {
    return <div>
        <CounterMessageView id="message" value={counter.value}/>
        <button id="add" onClick={() => { counter.value++ }}>{counter.lang.add}</button>
        <button id="error" onClick={() => { counter.value = ('someStr': any) }}>{counter.lang.error}</button>
    </div>
}

class SecondCounterService extends FirstCounterService {
    lang = {
        add: 'cloned Add',
        error: 'cloned Gen error'
    }
}

function SecondCounterMessageView({value}: {value: number}) {
    return <div>
        SecondCounter Count: {value}
    </div>
}

function SecondCounterAddButtonView(
    {onClick, children, id}: {
        id: string;
        onClick: () => void;
        children: string
    }
) {
    return <button id={id} onClick={onClick}>SecondCounterAddButton: {children}</button>
}

const SecondCounterView = cloneComponent(FirstCounterView, [
    [FirstCounterService, SecondCounterService],
    [CounterMessageView, SecondCounterMessageView],
    ['add', SecondCounterAddButtonView],
    ['error', null]
], 'SecondCounterView')

function ThirdCounterAddButtonView(
    {onClick, children, id}: {
        id: string;
        onClick: () => void;
        children: string
    }
) {
    return <button id={id} onClick={onClick}>ThirdCounterAddButton: {children}</button>
}

const ThirdCounterView = cloneComponent(SecondCounterView, [
    ['add', ThirdCounterAddButtonView]
], 'ThirdCounterView')

export function CounterView() {
    return <ul>
        <li id="list(first)">FirstCounter: <FirstCounterView id="first"/></li>
        <li id="list(second)">SecondCounter extends FirstCounter: <SecondCounterView id="second"/></li>
        <li id="list(third)">ThirdCounter extends SecondCounter: <ThirdCounterView id="third"/></li>
    </ul>
}
