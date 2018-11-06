const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  title: 'Agorize UI-Kit',
  components: './src/components/**/*.vue',
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  sections: [
    {
      name: 'Get started',
      content: 'docs/get-started.md'
    },
    {
      name: 'Components',
      components: './src/components/*/*',
      sectionDepth: 1
    }
  ],
  webpackConfig: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: "vue-loader"
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.scss$/,
          loader: "sass-loader!css-loader"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
