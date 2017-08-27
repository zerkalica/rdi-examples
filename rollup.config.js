import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'
import resolve from 'rollup-plugin-node-resolve'

import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import visualizer from 'rollup-plugin-visualizer'

import babelrc from 'babelrc-rollup'

import fs from 'fs'
import path from 'path'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

function fixbabelrc(rc) {
    return Object.assign({}, rc, {
        presets: rc.presets.map((preset) => {
            if (preset[0] === 'es2015') {
               return preset
            }
            delete preset[1].modules
            return Object.keys(preset[1]).length ? preset : preset[0]
        })
    })
}

const rc = fixbabelrc(babelrc())

const baseConfig = {
    sourcemap: true,
    plugins: [

        resolve({
            browser: true,
            module: true
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: [
                //  'node_modules/preact/**',
                 'node_modules/reactive-di/**',
                 'node_modules/lom_atom/**'
            ]
        }),

        sourcemaps(),
        babel(rc),
        globals()
    ].concat(process.env.UGLIFY === '1' ? [uglify({}, minify)] : [])
}

const perfPlugins = baseConfig.plugins.concat([
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
])

const examplesConfig = Object.assign({}, baseConfig, {
    input: 'src/examples/index.js',
    output: [
        {file: pkg['iife:main'], format: 'iife', name: pkg.name.replace('-', '_').replace('-', '_')}
    ],
    plugins: baseConfig.plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        visualizer({filename: path.join(__dirname, 'docs', 'stat.html') })

    ])
})

function toConfig(name) {
    return Object.assign({}, baseConfig, {
        input: `src/perf/${name}/index.js`,
        output: [
            {file: `docs/perf/${name}/bundle.js`, format: 'iife', name: name.replace(/\-/g, '_')}
        ],
        plugins: perfPlugins
    })
}

export default [
     examplesConfig
].concat([
    'preact-raw', 'preact-mobx', 'preact-lom', 'preact-lom-rdi'
].map(toConfig))
