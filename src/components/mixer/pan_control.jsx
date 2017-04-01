'use strict'

import React from 'react'
import Slider from './slider.jsx'

const panStyles = props => ({
})

const labelStyle = props => ({
  margin: 0,
  display: 'inline'
})

export default function(props) {
  return (
    <div className='pan-control' >
      <label htmlFor='pan' style={ labelStyle(props) }>Pan:</label>
      <Slider
        onChange={ props.onChange }
        min={ -1.0 } max={ 1.0 }
        name='pan'
        value={ props.pan } />
    </div>
  )
}
