const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const env = process.env

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      accordions: path.resolve('.', 'src', 'accordions.js'),
      scrollevents: path.resolve('.', 'src', 'scrollevents.js'),
      vendor: [
        './modernizr-custom',
        'normalize.css'
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/output/
     */
    output: {
      filename: '[name].js',
      path: path.resolve('.', 'docs'),
      publicPath: '/'
    },

    /**
     * @see https://webpack.js.org/configuration/module/
     */
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader?cacheDirectory=true',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader?sourceMap=inline'
          ]
        }
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),

      /**
       * @see https://webpack.js.org/guides/code-splitting-libraries/
       */
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',
          'manifest'
        ]
      }),

      /**
       * @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
       */
      new UglifyJSPlugin({
        sourceMap: true
      })
    ],

    /**
     * @see https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      compress: true,
      contentBase: path.resolve('.', 'docs'),
      port: 8080,
      historyApiFallback: true,
      https: true
    },

    /**
     * @see https://webpack.js.org/configuration/devtool/
     */
    devtool: 'inline-source-map'
  }
]
