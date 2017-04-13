'use strict'

import React from 'react'
import Slider from './slider/slider.jsx'
import './gain.scss'

export default function(props) {
  return (
    <div className='gain-control'
    >
      <div className='gain-label'>
        <p>Volume:</p>
      </div>
      <Slider
        onChange={ props.onChange }
        min={ 0.0 } max={ 1.0 } value={ props.gain } />
    </div>
  )
}
