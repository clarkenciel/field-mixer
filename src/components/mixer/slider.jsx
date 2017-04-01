'use strict'

import React from 'react'

const holderStyle = ({ width }) => ({
  width: width
})

const sliderStyle = (props) => ({
  // const base = sharedStyle(props)
  width: '100%',
  outline: 'none',
  cursor: 'pointer',
  color: 'transparent',
  background: 'transparent',
  borderColor: 'transparent'
})

// TODO: fuck around with css to make this look nice
export default function Slider(props) {
  return (
    <div style={ holderStyle(props) } className='slider-holder' >
      <input
        name={ props.name }
        value={ props.value }
        min={ props.min }
        max={ props.max }
        step={ 0.01 }
        onChange={ props.onChange }
        className='mixer-slider'
        style={ sliderStyle(props) } type='range' />
    </div>
  )
}
