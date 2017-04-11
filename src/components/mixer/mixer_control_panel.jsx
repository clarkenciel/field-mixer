'use strict'

import React from 'react'
import Play from './play_button.jsx'
import Stop from './stop_button.jsx'

const mixerStyle = props => ({
  width: '100%',
  backgroundColor: props.playing ? '#eaeaaa' : '#aaeaaa',
  // paddingTop: '10px',
  cursor: 'pointer',
  height: '100%'
})

const buttonHolderStyle = props => ({
  margin: 'auto',
  width: `${props.width}px`,
  padding: '1%'
})

export default function(props) {
  const buttonLen = 60
  const clickHandle = props.playing ?
    () => props.onPause() :
    () => props.onPlay()
  const button = props.playing ?
    <Stop length={ buttonLen } /> :
    <Play length={ buttonLen } />

  return (
    <div id='mixer-controls' style={ mixerStyle(props) } onClick={ clickHandle }>
      <div id='button-holder' style={ buttonHolderStyle({ width: buttonLen }) } >
        { button }
      </div>
    </div>
  )
}
