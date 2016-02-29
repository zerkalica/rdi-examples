/* @flow */
import type {Widget} from 'reactive-di-react/i/interfaces'

export type PageMap = {
    DefaultPage: Widget<void>;
    NotFoundPage: Widget<void>;
    [id: string]: Widget<void>;
};
