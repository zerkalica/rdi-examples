/* @flow */

export default function instanceMap(err: ?Error, map: Array<[?Function, any]>): any {
    let defaultValue: any;
    for (let i = 0, l = map.length; i < l; i++) {
        const [klass, value] = map[i]
        if (klass === null) {
            defaultValue = value
        } else if (err && err instanceof klass) {
            return value
        }
    }

    return defaultValue
}
