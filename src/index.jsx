'use strict'

import React from 'react'
import { render } from 'react-dom'
import context from './audio_context.js'
import Library from './components/sample_library/library.jsx'
import Mixer from './components/mixer/mixer.jsx'
import AppComponent from './components/app.jsx'
import Region from './audio_managers/region.js'

const timelines = Array(4).fill(null).map(_ => {
  const regions = Array(Math.floor(Math.random() * 10)).
    fill(null).map(_ => ({
      fileName: Math.ceil(Math.random()) + '.wav'
    }))

  return {
    pan: Math.random() * 2 - 1,
    gain: Math.random(),
    currentlyPlayingRegion: Math.floor(Math.random() * regions.length),
    regions: regions
  }
})

const samples = Array(10).fill(null).map(_ => ({
  fileName: Math.random() + '.wav',
  region: Region.fromBuffer([])
}))

const dh = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
)
const dw = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
)

const libraryProps = {
  visible: false,
  samples: samples,
  onCoverClick: console.log,
  onSampleClick: console.log
}

const mixerProps = {
  timelines: timelines,
  playing: false,
  onRegionAdd: console.log,
  onGainChange: console.log,
  onPanChange: console.log,
  onPlay: console.log,
  onPause: console.log
}

render(
  <AppComponent
    dh={ dh }
    dw={ dw }
    libraryProps={libraryProps}
    mixerProps={mixerProps}
  />,
  document.getElementById('mixer')
)

