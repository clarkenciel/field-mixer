'use strict'

import React from 'react'
import Controls from './controls/mixer_control_panel.jsx'
import TlGroup from './timelines/group/group.jsx'
import './mixer.scss'
// import LA from '../actions/library/dispatchers.js'

export default function(props) {
  return (
    <div
      id='mixer-app'
    >
      <div className='timeline-holder'>
        <TlGroup
          timelines={ props.timelines }
          inView={ props.timelineInView }
          onAdd={ props.onRegionAdd }
          onRemove={ props.onRegionRemove }
          onGainChange={ props.onGainChange }
          onPanChange={ props.onPanChange }
          onSetRegionWait={ props.onSetRegionWait }
        />
      </div>

    <div className='control-holder'>
      <Controls
        playing={ props.playing }
        onPlay={ props.onPlay }
        onStop={ props.onStop }
      />
    </div>
  </div>
  )
}
