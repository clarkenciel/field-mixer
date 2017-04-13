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
        <p>L</p>
      </div>
      <Slider
        onChange={ props.onChange }
        min={ -1.0 } max={ 1.0 }
        name='pan'
        value={ props.pan } />
      <div className='label right'>
        <p>R</p>
      </div>
    </div>
    )
}
