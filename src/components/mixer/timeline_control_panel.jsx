'use strict'

import React from 'react'
import Slider from './slider.jsx'
import Gain from './gain_control.jsx'
import Pan from './pan_control.jsx'

const style = props => ({
  // backgroundColor: '#999999'
  width: props.width
})

export default function(props) {
  return (
    <div
      className='timeline-controls'
      style={ style(props) }
    >
      <Gain {...props} onChange={ props.onGainChange }/>
      <Pan {...props} onChange={ props.onPanChange }/>
    </div>
  )
}
