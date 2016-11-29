// @flow

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
    DefinePlugin,
    NormalModuleReplacementPlugin,
    optimize
} from 'webpack'

function getFallbackPaths(root: string): string[] {
    const fallback: string[] = []
    if (process.env.NVM_PATH) {
        fallback.push(path.resolve(process.env.NVM_PATH, '..', 'node_modules'))
    }
    fallback.push(path.resolve(root, 'node_modules'))

    return fallback
}

function createCreateStyleLoaders(isProduction: boolean): (...args: any[]) => string[] {
    const styleOptions: string [] = [
        'singleton'
    ]

    const cssOptions: string[] = [
        // 'autoprefixer',
        (isProduction ? '-' : '') + 'sourceMap',
        (isProduction ? '' : '-') + 'minimize'
    ]

    return function createStyleLoaders(...styleArgs: any[]): string[] {
        const styleLoader = 'style?' + styleOptions.join('&')
        const cssLoader = 'css?' + cssOptions.join('&')
        return [styleLoader, cssLoader].concat(styleArgs)
    }
}

const root: string = path.resolve(__dirname, '..')

const debugStubPath: string = require.resolve('empty/functionThatReturns')
const isProduction = process.env.NODE_ENV === 'production'
const fallback = getFallbackPaths(root)
const createStyleLoaders = createCreateStyleLoaders(isProduction)

export default {
    cwd: root,
    cache: true,
    debug: true,
    devtool: 'source-map',
    resolve: {
        fallback,
        alias: {
            buffer: 'empty/object',
            querystring: 'querystring-browser'
        }
    },
    resolveLoader: {
        fallback
    },
    output: {
        publicPath: '',
        path: path.resolve(root, 'docs'),
        filename: 'app.js'
    },
    entry: {
        'browser': [
            path.resolve(root, 'src', 'browser.js')
        ]
    },
    configLoader: {
        env: isProduction ? 'prod' : 'dev',
        instance: process.env.APP_INSTANCE || 'client'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: ['src', 'lib'],
                loaders: ['source-map']
            }
        ],
        loaders: [
            {
                test: /.*\.configloaderrc$/,
                loader: 'node-config-loader/webpack'
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.(?:jsx?|es6)$/,
                include: /(?:src|modules)/,
                exclude: /(?:node_modules|bower_components)/,
                loaders: ['babel-loader'] // 'react-hot-loader'
            },
            {
                test: /\.(?:png|jpg|gif|ico)$/,
                loader: 'file?name=assets/[name].[ext]'
            },
            {
                test: /\.(?:eot|woff|woff2|ttf|svg)(?:\?v\=[\d\w\.]+)?$/,
                loader: 'file?name=assets/[name].[ext]'
            },
            {
                test: /\.css$/,
                loaders: createStyleLoaders()
            }
        ]
    },
    plugins: [
        new NormalModuleReplacementPlugin(/^co$/, debugStubPath),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            title: 'todomvc demo',
            template: path.resolve(__dirname, 'index.ejs')
        })
    ].concat(isProduction ? [
        new NormalModuleReplacementPlugin(/^debug$/, debugStubPath),
        new optimize.DedupePlugin(),
        new optimize.OccurenceOrderPlugin(),
        new optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : [])
}
