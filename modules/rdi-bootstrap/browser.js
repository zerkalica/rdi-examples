// @flow
/* eslint-disable import/imports-first */

import './polyfills'

import React from 'react'
import ReactDOM from 'react-dom'
import {create} from 'jss'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import jssCompose from 'jss-compose'

import bowser from 'bowser'

import {Di, ReactComponentFactory} from 'reactive-di'
import type {RegisterDepItem, Atom} from 'reactive-di'

import {PageNotFoundError, Route, RouterManager} from 'modern-router'
import {BrowserLocation} from 'modern-router/browser'
import {BaseEnv, BrowserInfo} from 'rdi-helpers'
import {BrowserLocalStorage} from 'rdi-helpers/browser'

import createRouterManager from './createRouterManager'

function createJssStylesAdapter<Jss: Object>(createJss: () => Jss) {
    const jss: Jss = createJss()
    jss.use(nested())
    jss.use(camelCase())
    jss.use(jssCompose())

    return function stylesAdapter(styles) {
        return jss.createStyleSheet(styles)
    }
}

function createBrowserRenderer<Component>(
    pages: {[id: string]: Component},
    ErrorPage: Component,
    FallbackPage: Component,
    h: (component: Component, props: {[id: string]: any}) => any
): (page: ?string) => void {
    return function browserRenderer(pageId: ?string): void {
        const page: ?Component = pageId ? pages[pageId] : null
        try {
            if (!page) {
                throw new PageNotFoundError(pageId)
            }
            h(page, {})
        } catch (error) {
            try {
                h(ErrorPage, {error})
            } catch (subErr) {
                subErr.parent = error
                h(FallbackPage, {error: subErr})
            }
            throw error
        }
    }
}

export default function browserInit(
    {
        window,
        elementId,
        values,
        rdi,
        pages,
        ErrorPage,
        FallbackPage
    }: {
        window: Object,
        elementId: string,
        values: {[id: string]: Object},
        rdi: RegisterDepItem[],
        pages: {[id: string]: Function},
        ErrorPage: Function,
        FallbackPage: Function
}): () => () => void {
    const componentAdapter = new ReactComponentFactory(
        React,
        values.DebugConfig ? !!values.DebugConfig.isEnabled : false
    )

    const node = window.document.getElementById(elementId)
    const di = new Di(componentAdapter, createJssStylesAdapter(create))
        .register(rdi.concat([
            [RouterManager, createRouterManager]
        ]))
        .values({
            ...values,
            AbstractStorage: new BrowserLocalStorage(window.localStorage),
            AbstractLocation: new BrowserLocation(window),
            BaseEnv: new BaseEnv(
                window.document.referrer,
                window.navigator.userAgent,
                window.navigator.language
            ),
            BrowserInfo: new BrowserInfo(bowser)
        })

    const wrappedPages: {[id: string]: Function} = {}
    const keys = Object.keys(pages)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        wrappedPages[key] = di.wrapComponent(pages[key])
    }

    const render: (pageId: ?string) => void = createBrowserRenderer(
        wrappedPages,
        di.wrapComponent(ErrorPage),
        (props) => FallbackPage(props, {}, React.createElement),
        (widget, attrs) => {
            ReactDOM.render(React.createElement(widget, attrs), node)
        }
    )
    const routeAtom: Atom<Route> = di.val(Route)
    const renderReact = (route: Route) => {
        routeAtom.set(route)
        render(route.page)
    }

    const rm: Atom<RouterManager> = di.val(RouterManager)

    return function start(): () => void {
        return rm.get().onChange(renderReact)
    }
}
