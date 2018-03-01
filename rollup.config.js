import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'
import resolve from 'rollup-plugin-node-resolve'

import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
// import visualizer from 'rollup-plugin-visualizer'
import alias from 'rollup-plugin-alias'
import builtins from 'rollup-plugin-node-builtins'

import fs from 'fs'
import path from 'path'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')))
const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc')))

const magic = 'commonjs'
babelrc.babelrc = false
babelrc.plugins = babelrc.plugins.map(
    plugin => (Array.isArray(plugin) ? (plugin[0] || ''): plugin).indexOf(magic) >= 0 ? null : plugin
).filter(Boolean)

babelrc.runtimeHelpers = true
//babelrc.externalHelpers = true

const uglifyOpts = {
    warnings: true,
    compress: {
        reduce_vars: false,
        dead_code: true,
        unused: true,
        toplevel: true,
        warnings: true
    },
    mangle: {
        properties: false,
        toplevel: false
    }
}

const isUglify = process.env.UGLIFY !== undefined
    ? process.env.UGLIFY === '1'
    : process.env.NODE_ENV === 'production'

const aliases = {
    'babel-runtime': '@babel/runtime'
}

if (process.env.NODE_ENV === 'production') aliases['preact/devtools'] = 'empty/object'

const baseConfig = {
    plugins: [
        resolve({
            browser: true,
            module: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        alias(aliases),
        builtins(),
        commonjs({
            include: 'node_modules/**',
            exclude: [
                 'node_modules/reactive-di/**',
                 'node_modules/lom_atom/**'
            ]
        }),

        sourcemaps(),
        babel(babelrc),
        globals(),
    ].concat(isUglify ? [uglify(uglifyOpts, minify)] : [])
}


const examplesConfig = Object.assign({}, baseConfig, {
    input: 'src/examples/index.js',
    output: [
        {
            sourcemap: true,
            file: pkg['iife:main'],
            format: 'iife',
            name: pkg.name.replace('-', '_').replace('-', '_')
        }
    ]
})

console.log(process.env.NODE_ENV)

export default examplesConfig
