'use strict'

import React from 'react'
import Svg from './square_svg.jsx'

const rectStyle = fill => ({
  stroke: 'black',
  strokeWidth: '3px',
  fill: fill
})

export default function(props) {
  return (
    <Svg {...props} >
      <rect
        x={ props.length * 0.20 }
        y={ 10 }
        width={ props.length * 0.16 }
        height={ props.length - 20 }
        style={ rectStyle(props.fill || 'none') }
      />
      <rect
        x={ (props.length - (props.length * 0.15)) * 0.66 }
        y={ 10 }
        width={ props.length * 0.16 }
        height={ props.length - 20 }
        style={ rectStyle(props.fill || 'none') }
      />
    </Svg>
    )
}
