/* @flow */
import {value} from 'reactive-di/annotations'

@value()
export default class AbstractStorage {
    getItem: <V>(key: string) => ?V;
    setItem: <V>(key: string, value: V) => void;
    removeItem: (key: string) => void;
    clear: () => void;
}
