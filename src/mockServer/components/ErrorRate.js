/* @flow */

import type {
    FlowFix,
    Element,
    EventHelper
} from 'reactive-di-todomvc/common'

import type {
    ErrorRateValue,
    ChangeEditing
} from 'reactive-di-todomvc/mockServer'

import type {Tr} from 'any-translate'

type ErrorRateProps = {
    t: Tr;
    helper: EventHelper;
    rate: ErrorRateValue;
    changeEditing: ChangeEditing;
}

export type IErrorRate = FlowFix<void>;

export default function ErrorRate({
    helper,
    t,
    rate,
    changeEditing
}: ErrorRateProps): Element {
    return (
        <div>
            <label forHtml="error-rate-input">{t('Error rate:')}</label>
            <input
                type="number"
                max="100"
                min="0"
                maxLength="3"
                size="3"
                id="error-rate-input"
                name="error-rate-input"
                value={rate}
                onChange={helper.change((val: string) => changeEditing(val))}
            /><span>%</span>
        </div>
    )
}
