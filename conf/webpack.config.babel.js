// @flow

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
    LoaderOptionsPlugin,
    DefinePlugin,
    NormalModuleReplacementPlugin,
    optimize
} from 'webpack'

function createCreateStyleLoaders(isProduction: boolean): (...args: any[]) => string[] {
    const styleOptions: string [] = [
        'singleton'
    ]

    const cssOptions: string[] = [
        // 'autoprefixer',
        'context=/',
        (isProduction ? '-' : '') + 'sourceMap',
        (isProduction ? '' : '-') + 'minimize'
    ]

    return function createStyleLoaders(...styleArgs: any[]): string[] {
        const styleLoader = 'style-loader?' + styleOptions.join('&')
        const cssLoader = 'css-loader?' + cssOptions.join('&')
        return [styleLoader, cssLoader].concat(styleArgs)
    }
}

const root: string = path.resolve(__dirname, '..')

const debugStubPath: string = require.resolve('empty/functionThatReturns')
const isProduction = process.env.NODE_ENV === 'production'
const createStyleLoaders = createCreateStyleLoaders(isProduction)

export default {
    cache: true,
    devtool: 'source-map',
    resolve: {
        alias: {
            buffer: 'empty/object',
            querystring: 'querystring-browser'
        }
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
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: ['src', 'lib'],
                loaders: ['source-map-loader']
            },
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
                loaders: ['babel-loader']
            },
            {
                test: /\.(?:png|jpg|gif|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.(?:eot|woff|woff2|ttf|svg)(?:\?v\=[\d\w\.]+)?$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.css$/,
                loaders: createStyleLoaders()
            }
        ]
    },
    plugins: [
        new LoaderOptionsPlugin({
            options: {
                configLoader: {
                    env: isProduction ? 'prod' : 'dev',
                    instance: process.env.APP_INSTANCE || 'client'
                }
            }
        }),

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
        new optimize.OccurrenceOrderPlugin(),
        new optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : [])
}
