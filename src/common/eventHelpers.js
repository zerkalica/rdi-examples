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
    preventDefault: boolean = true
): (e: Event) => void {
    return function _handleChange(e: Event): void {
        if (preventDefault) {
            e.preventDefault()
        }
        if (e.keyCode === 13) {
            func()
        }
    }
}
