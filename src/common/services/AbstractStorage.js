/* @flow */

export default class AbstractStorage {
    length: number;
    getItem: (key: string) => ?string;
    setItem: (key: string, data: string) => void;
    clear: () => void;
    removeItem: (key: string) => void;
    key: (index: number) => ?string;
    // [name: string]: ?string;
}
