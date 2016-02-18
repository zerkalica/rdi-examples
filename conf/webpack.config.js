import path from 'path'
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
    entry: path.resolve(__dirname, '..', 'src', 'cli.js'),
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
                exclude: /(?:src)/,
                include: /(?:node_modules|bower_components)/,
                loader: 'source-map-loader'
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
                loader: 'style-loader?singleton!css-loader!postcss-loader',
                test: /\.css$/
            }
        ]
    },
    postcss: () => [autoprefixer],
    plugins: [
        new HtmlWebpackPlugin({
            title: 'todomvc demo',
            template: path.resolve(__dirname, 'assets', 'index.ejs')
        })
    ]
}
