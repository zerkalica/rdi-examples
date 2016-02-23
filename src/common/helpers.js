/* @flow */

export function assignString<V: string>(value?: V, defValue?: string = ''): V {
    if (value && typeof value !== 'string') {
        throw new Error(`Value is not a string ${value}`)
    }
    return value || ((defValue: any): V)
}

export function assignBoolean(value?: boolean): boolean {
    if (value && typeof value !== 'boolean') {
        throw new Error(`Value is not a boolean ${value}`)
    }
    return value || false
}

export function assignModel<V: Object>(model?: ?V, Model: Class<V>): V {
    if (model && !(model instanceof Model)) {
        throw new Error(`Model is not an instance of ${Model.displayName || Model.name}`)
    }
    return model || new Model()
}
