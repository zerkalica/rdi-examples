// @flow

import {mem, force} from 'lom_atom'
import {cloneComponent} from 'reactive-di'

class FirstCounterService {
    @force $: FirstCounterService
    lang = {
        add: 'Add',
        error: 'Gen error'
    }
    @mem get value(): number {
        setTimeout(() => {
            this.$.value = 1
            // this.value = new Error('loading error')
        }, 500)

        throw new mem.Wait()
    }

    @mem set value(v: number | Error) {
        if (typeof v === 'string') {
            throw new TypeError('Test error')
        }
    }
}

function CounterMessageView({value}: {value: number}) {
    return <div>
        Count: {value}
    </div>
}

function FirstCounterView(
    _: {},
    counter: FirstCounterService
) {
    return <div>
        <CounterMessageView value={counter.value}/>
        <button id="FirstCounterAddButton" onClick={() => { counter.value++ }}>{counter.lang.add}</button>
        <button id="FirstCounterGenErrorButton" onClick={() => { counter.value = ('someStr': any) }}>{counter.lang.error}</button>
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
    {onClick, children}: {
        onClick: () => void, children: string
    }
) {
    return <button id="SecondCounterAddButton" onClick={onClick}>SecondCounterAddButton: {children}</button>
}

const SecondCounterView = cloneComponent(FirstCounterView, [
    [FirstCounterService, SecondCounterService],
    [CounterMessageView, SecondCounterMessageView],
    ['FirstCounterAddButton', SecondCounterAddButtonView],
    ['FirstCounterGenErrorButton', null]
], 'SecondCounterView')

function ThirdCounterAddButtonView(
    {onClick, children}: {
        onClick: () => void, children: string
    }
) {
    return <button id="ThirdCounterAddButton" onClick={onClick}>ThirdCounterAddButton: {children}</button>
}

const ThirdCounterView = cloneComponent(SecondCounterView, [
    ['FirstCounterAddButton', ThirdCounterAddButtonView]
], 'ThirdCounterView')

export function CounterView() {
    return <ul>
        <li>FirstCounter: <FirstCounterView/></li>
        <li>SecondCounter extends FirstCounter: <SecondCounterView/></li>
        <li>ThirdCounter extends SecondCounter: <ThirdCounterView/></li>
    </ul>
}
