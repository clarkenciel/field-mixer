'use strict'

import React from 'react'
import Slider from './slider/slider.jsx'

const panStyles = props => ({
})

const labelStyle = props => ({
  margin: 0,
  display: 'inline'
})

export default function(props) {
  return (
    <div className='pan-control'
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <div style={{ paddingTop: '5px' }}><h3>L</h3></div>
      <div>
        <Slider
          onChange={ props.onChange }
          min={ -1.0 } max={ 1.0 }
          name='pan'
          value={ props.pan } />
      </div>
      <div style={{ paddingTop: '5px' }}><h3>R</h3></div>
    </div>
    )
}
