'use strict'

import React from 'react'
import Play from './play_button.jsx'
import Pause from './pause_button.jsx'

const mixerStyle = props => ({
  width: '100%',
  backgroundColor: props.playing ? '#eaeaaa' : '#aaeaaa',
  paddingTop: '10px'
})

const buttonHolderStyle = props => ({
  margin: 'auto',
  width: `${props.width}px`,
})

export default function(props) {
  const buttonLen = 60
  const button = props.playing ?
    <Pause length={ buttonLen } /> :
    <Play length={ buttonLen } />

  return (
    <div id='mixer-controls' style={ mixerStyle(props) }>
      <div id='button-holder' style={ buttonHolderStyle({ width: buttonLen }) } >
        { button }
      </div>
    </div>
  )
}
