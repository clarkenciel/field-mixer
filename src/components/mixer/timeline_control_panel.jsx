'use strict'

import React from 'react'
import Gain from './gain_control.jsx'
import Pan from './pan_control.jsx'

const style = props => ({
  width: props.width,
  marginLeft: '5px',
  marginRight: '5px',
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
