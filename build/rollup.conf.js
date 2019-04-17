import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import postcss from 'rollup-plugin-postcss'
import builtins from 'rollup-plugin-node-builtins'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  input: path.resolve(src, 'index.js'),
  external: ['vue'],
  plugins: [
    vue(),
    builtins(),
    resolve({
      external: ['vue']
    }),
    alias({
      resolve: ['.vue', '.js', '.scss'],
      '@': path.resolve('src'),
      'public': path.resolve('public')
    }),
    // node(),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true,
      plugins: [autoprefixer()]
    }),
    babel(babelrc())
  ],
  output: [
    {
      globals: {
        'vue': 'Vue$1'
      },
      format: 'cjs',
      file: path.resolve(dist, `gommette.common.js`),
      sourcemap: true
    },
    {
      globals: {
        'vue': 'Vue$1'
      },
      format: 'es',
      file: path.resolve(dist, `gommette.esm.js`),
      sourcemap: true
    },
    {
      globals: {
        'vue': 'Vue$1'
      },
      format: 'iife',
      name: 'gommette',
      file: path.resolve(dist, `gommette.min.js`)
    }
  ]
}
