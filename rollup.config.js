import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import node from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.min.js',
    format: 'umd',
    name: 'agorizeUikit'
  },
  plugins: [
    eslint({
      exclude: [
        'node_modules/**',
        'src/styles/**'
      ]
    }),
    vue(),
    node(),
    scss({
      output: true,
      processor: css => postcss([autoprefixer])
        .process(css)
        .then(result => result.css)
    }),
    buble({ objectAssign: 'Object.assign' }),
    uglify()
  ]
}
