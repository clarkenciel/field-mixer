'use strict'

import React from 'react'
import Controls from './mixer_control_panel.jsx'
import TlGroup from './timeline_group.jsx'

const style = props => ({
  backgroundColor: '#777777',
  position: 'relative',
  height: '100%',
})

export default function(props) {
  return (
    <div
      id='mixer-app'
      style={ style(props) }
    >
      <TlGroup
        timelines={ props.timelines }
      />
      <Controls
        playing={ props.playing }
      />
    </div>
  )
}
