/* @flow */

export function handleChange(
    func: (value: string) => void,
    preventDefault: boolean = true
): (e: Event) => void {
    return function _handleChange(e: Event): void {
        const target: EventTarget = e.target;
        if (!(target instanceof HTMLInputElement)) {
            throw new Error('Not an HTMLInputElement: ' + target.toString())
        }
        if (preventDefault) {
            e.preventDefault()
        }

        func(target.value)
    }
}

export function handleEnter(
    func: () => void,
    preventDefault: boolean = false
): (e: SyntheticKeyboardEvent) => void { // eslint-disable-line
    return function _handleChange(e: SyntheticKeyboardEvent): void { // eslint-disable-line
        if (e.charCode === 13) {
            if (preventDefault) {
                e.preventDefault()
            }
            func()
        }
    }
}

export const KEY_ENTER = 13
export const KEY_ESC = 27
