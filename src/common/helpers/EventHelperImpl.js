/* @flow */
import type {EventHandler} from 'reactive-di-todomvc/i/commonInterfaces'

export default class EventHelperImpl {
    click<V>(
        func: EventHandler<V>,
        value: V
    ): (e: Event) => void {
        return function handleClick(e: Event): void {
            e.preventDefault()
            func(value)
        }
    }

    change(
        func: (value: string) => void,
        preventDefault: boolean = true
    ): (e: Event) => void {
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
    ): (e: SyntheticKeyboardEvent) => void { // eslint-disable-line
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
