/* @flow */
import type {EventHandler} from 'reactive-di-todomvc/common'

type EventFn = (e: Event) => void
type SynthEventFn = (e: SyntheticKeyboardEvent) => void

export default class EventHelper {
    click<V>(
        func: EventHandler<V>,
        value: V
    ): EventFn {
        return function handleClick(e: Event): void {
            e.preventDefault()
            func(value)
        }
    }

    change(
        func: (value: string) => void,
        preventDefault: boolean = false
    ): EventFn {
        return function handleChange(e: Event): void {
            const target: EventTarget = e.target;
            if (preventDefault) {
                e.preventDefault()
            }
            if (target.value === undefined) {
                throw new Error(`Not an input: ${target.toString()}`)
            }
            func(target.value)
        }
    }

    keyMap(
        km: Array<[number, EventHandler, any]>
    ): SynthEventFn { // eslint-disable-line
        return function handleKeyPress(e: SyntheticKeyboardEvent): void { // eslint-disable-line
            for (let i = 0, l = km.length; i < l; i++) {
                const [code, cb, value] = km[i]
                if (e.charCode === code) {
                    e.preventDefault()
                    cb(value)
                }
            }
        }
    }
}
