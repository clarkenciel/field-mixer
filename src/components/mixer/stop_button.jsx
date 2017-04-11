'use strict'

import React from 'react'
import Svg from './square_svg.jsx'

const rectStyle = fill => ({
  stroke: 'black',
  strokeWidth: '3px',
  fill: 'black'
})

export default function(props) {
  return (
    <Svg {...props} >
      <rect
        x={ 10 }
        y={ 10 }
        width={ props.length }
        height={ props.length }
        style={ rectStyle(props.fill || 'none') }
      />
    </Svg>
    )
}
