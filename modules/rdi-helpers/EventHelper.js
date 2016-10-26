/* @flow */

export type EventHandler<V> = (value: V) => void
export type KeyMap = [
    // key codes
    number,
    // callback to run
    () => void
][]

type EventFn = (e: Event) => void
type SynthEventFn = (e: SyntheticKeyboardEvent) => void

export const KEYCODE: {[id: string]: number} = {
    ENTER: 13,
    ESC: 27
}

export default class EventHelper {
    click<V>(
        func: EventHandler<V>,
        value: V
    ): EventFn {
        return function handleClick(e: Event): void {
            e.preventDefault()
            e.stopPropagation()
            func(value)
        }
    }

    change(
        func: (value: string) => void,
        preventDefault: boolean = false
    ): EventFn {
        return function handleChange(e: Event): void {
            const target: EventTarget = e.target
            if (preventDefault) {
                e.preventDefault()
            }
            if (target.value === undefined) {
                throw new Error(`Not an input: ${target.toString()}`)
            }
            func((target: any).value)
        }
    }

    keyMap<V>(
        km: Array<[number, EventHandler<V>, any]>
    ): SynthEventFn { // eslint-disable-line
        return function handleKeyPress(e: SyntheticKeyboardEvent): void { // eslint-disable-line
            for (let i = 0, l = km.length; i < l; i++) {
                const [code, cb, value] = km[i]
                if (e.keyCode === code) {
                    e.preventDefault()
                    cb(value)
                }
            }
        }
    }
}
