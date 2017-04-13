'use strict'

import React from 'react'
import Gain from '../controls/sliders/gain_control.jsx'
import Pan from '../controls/sliders/pan_control.jsx'
import './control_panel.scss'

const style = props => ({
  width: props.width
})

export default function(props) {
  return (
    <div className='timeline-controls' style={ style(props) }>
      <Gain {...props} onChange={ props.onGainChange }/>
      <Pan {...props} onChange={ props.onPanChange }/>
    </div>
  )
}
