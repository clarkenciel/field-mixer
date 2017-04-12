'use strict'

import React from 'react'
import Controls from './controls/mixer_control_panel.jsx'
import TlGroup from './timelines/group/group.jsx'
import './mixer.scss'

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
