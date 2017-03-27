const path = require('path')
const webpack = require('webpack')
const HTMLLoader = require('html-webpack-plugin')

const here = path.resolve('.')
const srcDir = path.join(here, 'src')
const publicDir = path.join(here, 'build')

module.exports = {
  entry: [
    path.join(srcDir, 'index.js')
  ],

  output: {
    filename: 'app-[hash].js',
    path: publicDir,
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.js(x)$/i,
      exclude: /node_modules/,
      use: { 
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    }]
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

  devtool: 'source-map'
}
