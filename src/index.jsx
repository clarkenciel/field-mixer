'use strict'

import React from 'react'
import { render } from 'react-dom'
import context from './audio_context.js'
import AppContainer from './containers/app.js'

render(
  <AppContainer />,
  document.getElementById('mixer')
)

