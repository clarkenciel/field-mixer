'use strict'

import React from 'react'
import Svg from './square_svg.jsx'
import './play.scss'

const calculateDims = length => {
  let stopHeight = length - 10
  let stopWidth = length - 10
  return `10,10 ${stopWidth - 10},${5 + stopHeight * 0.5} 10,${stopHeight}`
}

export default function(props) {
  return (
    <Svg { ...props } >
      <polygon
        points={ calculateDims(props.length) }
        className='play-poly'
      />
    </Svg>
  )
}
