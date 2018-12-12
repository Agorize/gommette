const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  title: 'Agorize UI-Kit',
  components: './src/components/**/*.vue',
  ignore: [
    './src/components/**/*.md',
  ],
  require: [
    path.resolve('src/styles/index.scss')
  ],
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
        '@': path.resolve('src'),
        'public': path.resolve('public')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            loaders: {
              sass: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    indentedSyntax: true,
                    outputStyle: 'compressed',
                  },
                },
              ],
            },
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve('src/styles/index.scss')
                ]
              }
            }
          ],
        },
        {
          test: /\.sass$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: true
              }
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './public/fonts/[name]/[name].[ext]',
          }
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
