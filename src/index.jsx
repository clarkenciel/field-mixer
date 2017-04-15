'use strict'

import React from 'react'
import { render } from 'react-dom'
import Error from './components/error.jsx'
import context from './audio_context.js'
import AppContainer from './containers/app.js'
import spn from 'stereo-panner-node'

try {
  spn.polyfill()
  if (!('webkitAudioContext' in window) && !('AudioContext' in window)) {
    throw(Error('Your browser does not support web audio please try on an up-to-date version of Chrome, Firefox, or Safari'))
  }
  render(
    <AppContainer />,
    document.getElementById('mixer')
  )
}
catch (e) {
  render(
    <Error header={ 'Web audio error' } message={ e.message }/>,
    document.getElementById('mixer')
  )
}
