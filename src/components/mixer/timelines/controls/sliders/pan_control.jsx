'use strict'

import React from 'react'
import Slider from './slider/slider.jsx'
import './pan.scss'

const labelStyle = props => ({
  margin: 0,
  display: 'inline'
})

export default function(props) {
  return (
    <div className='pan-control'>
      <div className='label left'>
        L
      </div>
      <div>
        <Slider
          onChange={ props.onChange }
          min={ -1.0 } max={ 1.0 }
          name='pan'
          value={ props.pan } />
      </div>
      <div className='label right'>
        R
      </div>
    </div>
    )
}
