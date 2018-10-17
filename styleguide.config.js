const path = require('path')

module.exports = {
  // // Require global style, fonts, and languages
  // require: [
  //   path.resolve('config/styleguide/global.requires.js'),
  //   path.resolve('config/styleguide/styleguide-style.sass'),
  //   path.resolve('app/assets/fonts/icomoon/icomoon.eot'),
  //   path.resolve('app/assets/fonts/icomoon/icomoon.svg'),
  //   path.resolve('app/assets/fonts/icomoon/icomoon.ttf'),
  //   path.resolve('app/assets/fonts/icomoon/icomoon.woff')
  // ],
  webpackConfig: {
    resolve: {
      extensions: ['.js', '.vue', '.json']
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
                  }
                }
              ]
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader'
            },
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [path.resolve('app/javascript'), path.resolve('app/javascript/test')]
        },
        {
          test: /\.yml$/,
          loader: 'yaml-loader',
          include: path.resolve('config/locales'),
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.resolve('app/assets/fonts/[name].[ext]'),
          }
        }
      ]
    }
  },
  // Defines the directory of components
  // components: 'src/components/**/*.vue',
  // ignore components
  // ignore: [
  //   'app/javascript/components/AlgoliaClearIndex.vue',
  //   'app/javascript/components/AlgoliaRefinementList.vue',
  //   'app/javascript/components/ChallengeAlgoliaIndex.vue',
  //   'app/javascript/components/Challenges.vue',
  //   'app/javascript/components/ChallengesScope.vue',
  //   'app/javascript/components/StatsPanelPlaceholder.vue'
  // ],
  // Defines the initial state of the example code tab
  exampleMode: 'expand'
};
