// @flow

import {mem, force} from 'lom_atom'
import {cloneComponent} from 'reactive-di'

class Counter {
    @force $: Counter
    lang = {
        add: 'Add',
        error: 'Gen error'
    }
    @mem get value(): number {
        setTimeout(() => {
            this.value = 1
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

function BaseCounterView(
    _: {},
    counter: Counter
) {
    return <div>
        <CounterMessageView value={counter.value}/>
        <button onClick={() => { counter.value++ }}>{counter.lang.add}</button>
        <button onClick={() => { counter.$.value = ('someStr': any) }}>{counter.lang.error}</button>
    </div>
}

class ClonedCounter extends Counter {
    lang = {
        add: 'cloned Add',
        error: 'cloned Gen error'
    }
}

function ClonedCounterMessageView({value}: {value: number}) {
    return <div>
        cloned Count: {value}
    </div>
}

const ClonedCounterView = cloneComponent(BaseCounterView, [
    [Counter, ClonedCounter],
    [CounterMessageView, ClonedCounterMessageView]
], 'ClonedCounterView')

export function CounterView() {
    return <div>
        <BaseCounterView/>
        <ClonedCounterView/>
    </div>
}
