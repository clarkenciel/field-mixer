const path = require('path')
const webpack = require('webpack')
const HTMLLoader = require('html-webpack-plugin')

const here = path.resolve('.')
const srcDir = path.join(here, 'src')
const publicDir = path.join(here, 'build')

module.exports = {
  entry: [
    path.join(srcDir, 'index.jsx')
  ],

  output: {
    filename: 'app.[hash].js',
    path: publicDir,
    publicPath: './mixer/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/i,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    }, {
      test: /\.s?css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(gif|png|jpe?g)$/i,
      use: [{
        loader: 'file-loader'
      }, {
        loader: 'image-webpack-loader',
        query: {
          progressive: true,
          // optimizationLevel: 10,
          // interlaced: false
        }
      }]
    }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new HTMLLoader({
      title: 'field mixer',
      template: path.join(srcDir, 'index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ],

  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
}
