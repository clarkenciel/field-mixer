'use strict'

import Dispatcher from '../dispatcher/app.js'

export default creator => Object.keys(creator).reduce((acc, k) => {
  acc[k] = (...args) => Dispatcher.dispatch(creator[k](..args))
  return acc
}, {})
