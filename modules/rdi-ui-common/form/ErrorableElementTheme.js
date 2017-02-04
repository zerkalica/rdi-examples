// @flow
import {theme} from 'reactive-di/annotations'

export type ErrorSide = 'left' | 'right' | 'bottom' | 'top'

@theme
export default class ErrorableElementTheme {
    right: string
    left: string
    bottom: string
    baseError: string
    wrapper: string

    __css: mixed

    constructor() {
        const baseError = {
            composes: ['alert', 'alert-danger'],
            position: 'absolute',
            zIndex: 100,
            padding: '0.4em'
        }

        this.__css = {
            wrapper: {
                display: 'flex',
                position: 'relative',
                width: '100%'
            },
            right: {
                ...baseError,
                top: 0,
                left: '100%'
            },

            bottom: {
                ...baseError,
                top: '2.5em',
                left: 0,
                margin: 0
            },

            left: {
                ...baseError,
                top: 0,
                left: '-240px',
                margin: 0
            }
        }
    }

    message(side: ?ErrorSide): string {
        switch (side) {
            case 'left':
                return this.left
            case 'right':
                return this.right
            case 'bottom':
                return this.bottom
            default:
                return this.right
        }
    }
}
