// @flow

import type {ICallerInfo} from 'reactive-di'

export default class Logger {
    onError(e: Error, name: string): void {
        /* eslint-disable no-console */
        console.error(e, name)
    }

    onRender() {
        console.log('render frame')
    }

    onSetValue<V>(info: ICallerInfo<V>): void {
        /* eslint-disable no-console */
        console.log(
            `\nframe ${info.trace} #${info.opId} set ${info.modelName}\nfrom`,
            info.oldValue,
            '\nto',
            info.newValue
        )
    }
}
