'use strict'

import React from 'react'
import { render } from 'react-dom'
import context from './audio_context.js'
import Library from './components/sample_library/library.jsx'
import Controls from './components/mixer/timeline_control_panel.jsx'
import Timeline from './components/mixer/timeline.jsx'

render(
  <Timeline
    pan={ 0.0 }
    gain={ 0.5 }
    currentlyPlayingRegion={ 1 }
    regions={ [{ fileName: 'dogs.wav' }, { fileName: 'cats.wav' }] }
  />,
  document.getElementById('mixer')
)

