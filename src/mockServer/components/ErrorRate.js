/* @flow */

import _ from 'babel-plugin-transform-metadata/_'

import {component} from 'reactive-di-observable/annotations'

import type {
    FlowFix,
    Element,
    EventHelper
} from 'reactive-di-todomvc/common/i'

import type {
    ErrorRateValue,
    ChangeEditing
} from 'reactive-di-todomvc/mockServer/i'

import {CommonLayoutThemeVars} from 'reactive-di-todomvc/common/components/CommonLayoutTheme'

import type {Tr} from 'any-translate'

import {changeLayoutColor} from 'reactive-di-todomvc/mockServer/actions/themeActions'
import type {IChangeLayoutColor} from 'reactive-di-todomvc/mockServer/actions/themeActions'

import {Resolution} from 'observable-helpers'

type ErrorRateProps = {
    t: Tr;
    resolution: Resolution;
    helper: EventHelper;
    rate: ErrorRateValue;
    theme: CommonLayoutThemeVars;
    changeEditing: ChangeEditing;
    changeColor: IChangeLayoutColor;
}

export type IErrorRate = FlowFix;
export default function ErrorRate({
    helper,
    t,
    resolution,
    rate,
    theme,
    changeEditing,
    changeColor
}: ErrorRateProps): Element {
    return (
        <div>
            <div>
                <label forHtml="error-rate-input">{t('Error rate:')}</label>
                <input
                    type="range"
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
            <div>
                <label forHtml="theme-color-change-input">{t('Border color via JSS:')}</label>
                <input
                    type="range"
                    max="255"
                    min="20"
                    maxLength="3"
                    size="3"
                    id="theme-color-change-input"
                    name="theme-color-change-input"
                    value={theme.color}
                    onChange={helper.change((val: string) => changeColor(val))}
                /><span>%</span>
            </div>
            <div>
                Screen resolution: {resolution.width}x{resolution.height}
            </div>
        </div>
    )
}
component([
    [(_: IChangeLayoutColor), changeLayoutColor]
])(ErrorRate)
