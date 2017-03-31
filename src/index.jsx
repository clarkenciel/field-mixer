'use strict'

import React from 'react'
import { render } from 'react-dom'
import context from './audio_context.js'
import Region from './audio_managers/region.js'
import Library from './components/sample_library/library.jsx'

const regions = Array(4).fill(null).
  map(_ =>({
    fileName: 'x.wav',
    region: Region.fromBuffer(
      context.createBuffer(2, 44100, context.sampleRate))
  }))

render(
  <Library
    regions={ regions }
    columnWidth={ null }
  />,
  document.getElementById('mixer')
)

