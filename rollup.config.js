import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import node from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import sass from 'rollup-plugin-sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.min.js',
    format: 'umd',
    name: 'agorizeUikit'
  },
  plugins: [
    vue(),
    node(),
    sass({
      output: true,
      processor: css => postcss([autoprefixer])
        .process(css)
        .then(result => result.css)
    }),
    buble({ objectAssign: 'Object.assign' }),
    uglify()
  ]
}
