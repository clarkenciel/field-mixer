'use strict'

import React from 'react'
import './style.css'

const holderStyle = ({ width }) => ({
  width: width
})

// TODO: fuck around with css to make this look nice
export default function Slider(props) {
  return (
    <div
      className='slider-holder' >
      <input
        name={ props.name }
        value={ props.value }
        min={ props.min }
        max={ props.max }
        step={ 0.01 }
        onChange={ props.onChange }
        className='mixer-slider'
        type='range' />
    </div>
  )
}