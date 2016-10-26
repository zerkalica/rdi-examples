// @flow
import BaseCollection from './BaseCollection'
import AbstractStorage from './AbstractStorage'

import BaseEnv from './env/BaseEnv'
import BrowserInfo from './env/BrowserInfo'
import DebugConfig from './env/DebugConfig'
import QueryError from './errors/QueryError'
import EventHelper, {KEYCODE} from './EventHelper'

export type {
    CollectionItem,
    MapFn,
    FilterFn,
    SortFn,
    FindFn,
    Id,
    UpdateFn,
    SelectorFn,
    ItemRec,
    Collection
} from './IBaseCollection'

export {
    KEYCODE,
    EventHelper,
    QueryError,
    BaseEnv,
    BrowserInfo,
    DebugConfig,
    AbstractStorage,
    BaseCollection
}
