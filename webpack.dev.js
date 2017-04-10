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
    filename: 'app-[hash].js',
    path: publicDir,
    publicPath: '/'
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
      test: /\.(gif|jpe?g)$/i,
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
    new HTMLLoader({
      title: 'sikk mixxer',
      template: path.join(srcDir, 'index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devtool: 'source-map',
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  node: {

  }
}
