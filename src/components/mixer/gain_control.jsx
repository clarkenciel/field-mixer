'use strict'

import React from 'react'
import Slider from './slider.jsx'

const gainStyles = props => ({
  margin: 'auto'
})

const labelStyle = props => ({
  margin: 'auto',
  display: 'inline'
})

export default function(props) {
  return (
    <div className='gain-control'
    >
      <label htmlFor='gain' style={ labelStyle(props) }>Gain:</label>
      <Slider
        onChange={ props.onChange }
        min={ 0.0 } max={ 1.0 } value={ props.gain } />
    </div>
  )
}
