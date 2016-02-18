/* @flow */

import {
    DefaultIdCreator,
    SymbolMetaDriver,
    createAnnotations
} from 'reactive-di'

const idCreator = new DefaultIdCreator()

export function createId(): string {
    return idCreator.createId()
}

const annotations = createAnnotations(
    new SymbolMetaDriver(),
    new DefaultIdCreator()
)

export default {
    ...annotations,
    react: annotations.observable
}
