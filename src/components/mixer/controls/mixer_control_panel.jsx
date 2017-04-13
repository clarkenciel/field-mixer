'use strict'

import React from 'react'
import Play from './buttons/play_button.jsx'
import Stop from './buttons/stop_button.jsx'
import './mixer_control_panel.scss'

export default function(props) {
  const buttonLen = 60
  const clickHandle = props.playing ?
    () => props.onStop() :
    () => props.onPlay()
  const button = props.playing ?
    <Stop length={ buttonLen } /> :
    <Play length={ buttonLen } />

  return (
    <div
      id={ 'mixer-controls' }
      className={props.playing ? ' playing' : ' stopped' }
    >

      <div
        id='playback-control'
        className='button-holder'
        onClick={ clickHandle }
      >
        <div>
          { button }
        </div>
      </div>

    </div>
    )
}
