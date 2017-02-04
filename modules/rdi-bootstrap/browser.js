// @flow
/* eslint-disable import/imports-first */

import './polyfills'

import {createElement, Component} from 'react'
import {render} from 'react-dom'

// import {render} from 'inferno-dom'
// import Component from 'inferno-component'
// import createElement from 'inferno-create-element'

import {create as createJss} from 'jss'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import jssCompose from 'jss-compose'

import bowser from 'bowser'

import {DiFactory, ReactComponentFactory} from 'reactive-di'
import type {ILogger} from 'reactive-di'

import {PageNotFoundError, Route, RouterManager} from 'modern-router'
import {BrowserLocation} from 'modern-router/browser'

import {BaseEnv, BrowserInfo} from 'rdi-helpers'
import {BrowserLocalStorage} from 'rdi-helpers/browser'

import createRouterManager from './createRouterManager'
import AppView from './AppView'
import Pages from './Pages'

export default function browserInit(
    {
        window,
        elementId,
        values,
        pages,
        ErrorPage,
        rdi,
        logger
    }: {
        window: Object,
        elementId: string,
        values: {[id: string]: Object},
        pages: {[id: string]: Function},
        ErrorPage: Function,
        rdi: mixed[],
        logger: Class<ILogger>
}) {
    const di = (new DiFactory({
        values: {
            ...values,
            Pages: new Pages(pages),
            AbstractStorage: new BrowserLocalStorage(window.localStorage),
            AbstractLocation: new BrowserLocation(window),
            BaseEnv: new BaseEnv(
                window.document.referrer,
                window.navigator.userAgent,
                window.navigator.language
            ),
            BrowserInfo: new BrowserInfo(bowser)
        },
        logger,
        defaultErrorComponent: ErrorPage,
        themeFactory: createJss({
            plugins: [
                nested(),
                camelCase(),
                jssCompose()
            ]
        }),
        componentFactory: new ReactComponentFactory({
            Component,
            createElement
        })
    }))
        .create()
        .register([
            ...rdi,
            [RouterManager, createRouterManager]
        ])

    render(
        createElement(di.wrapComponent(AppView)),
        window.document.getElementById(elementId)
    )
}
