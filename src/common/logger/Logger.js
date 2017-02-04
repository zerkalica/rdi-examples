// @flow

import type {ICallerInfo} from 'reactive-di'

export default class Logger {
    onError(e: Error, name: string): void {
        /* eslint-disable no-console */
        console.error(e, name)
    }

    onSetValue<V>(info: ICallerInfo<V>): void {
        /* eslint-disable no-console */
        console.log(
            `\nframe ${info.trace}#${info.callerId}/${String(info.asyncType)} set ${info.modelName}\nfrom`,
            info.oldValue,
            '\nto',
            info.newValue
        )
    }
}
