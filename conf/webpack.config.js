import path from 'path'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

const fallback = []
if (process.env.NVM_PATH) {
    fallback.push(path.resolve(process.env.NVM_PATH, '..', 'node_modules'))
}
fallback.push(path.resolve(__dirname, '..', 'node_modules'))

export default {
    cwd: path.resolve(__dirname, '..'),
    cache: true,
    debug: true,
    devtool: 'source-map',
    resolve: {
        fallback
    },
    resolveLoader: {
        fallback
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'app.js'
    },
    entry: {
        'browser': [
            path.resolve(__dirname, '..', 'src', 'browser.js')
        ]
    },
    configLoader: {
        env: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
        instance: process.env.APP_INSTANCE || 'client'
    },
    module: {
        preLoaders: [
            {
                test: /\.styl$/,
                loader: 'import-glob-loader'
            },
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
                include: /(?:src)/,
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
                loaders: [
                    'style',
                    [
                        'css?sourceMap&-minimize',
                        // 'modules',
                        // 'importLoaders=1',
                        // 'localIdentName=[name]__[local]___[hash:base64:5]'
                    ].join('&'),
                    'postcss'
                ]
            }
        ]
    },
    postcss: [
        cssnano({
          autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions']
          },
          discardComments: {
            removeAll: true
          },
          discardUnused: false,
          mergeIdents: false,
          reduceIdents: false,
          safe: true,
          sourcemap: true
        })
    ],
    plugins: [
        new HtmlWebpackPlugin({
            title: 'todomvc demo',
            template: path.resolve(__dirname, 'assets', 'index.ejs')
        })
    ]
}
