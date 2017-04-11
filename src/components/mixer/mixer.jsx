'use strict'

import React from 'react'
import Controls from './mixer_control_panel.jsx'
import TlGroup from './timeline_group.jsx'

const style = props => ({
  backgroundColor: '#777777',
  position: 'relative',
  // height: '100%',
})

export default function(props) {
  return (
    <div
      id='mixer-app'
      style={ style(props) }
    >
      <div className='timeline-holder'
        style={{ height: '90%' }}
      >
        <TlGroup
          timelines={ props.timelines }
          onAdd={ props.onRegionAdd }
          onRemove={ props.onRegionRemove }
          onGainChange={ props.onGainChange }
          onPanChange={ props.onPanChange }
        />
      </div>

    <div className='control-holder'
      style={{ height: '10%' }}
    >
      <Controls
        playing={ props.playing }
        onPlay={ props.onPlay }
        onStop={ props.onStop }
      />
    </div>
  </div>
  )
}
