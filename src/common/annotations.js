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

export default createAnnotations(
    new SymbolMetaDriver(),
    idCreator
)
