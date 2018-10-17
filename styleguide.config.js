const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  components: './src/components/**/*.vue',
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  webpackConfig: {
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
