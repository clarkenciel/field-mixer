const express = require('express')
const path = require('path')
const fs = require('fs')

const isDeveloping = (process.env.NODE_ENV === 'production' ? false : true)

const app = express()

if (isDeveloping) {
  const webpack = require('webpack')
  const webpackMW = require('webpack-dev-middleware')
  const webpackHotMW = require('webpack-hot-middleware')
  const config = require('./webpack.dev.js')
  const compiler = webpack(config)
  const middleware = webpackMW(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: { colors: true }
  })

  app.use(middleware)
  app.use(webpackHotMW(compiler))
  app.use(express.static('.'))

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build', 'index.html')))
    res.end()
  })
}
else {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (req, res) => 
      fs.createReadStream(path.join(__dirname, 'dist', 'index.html')).pipe(res))
}

app.listen(process.env.PORT || 3000, () => console.log('server running')).
  on('error', console.log)
