'use strict'

import React from 'react'
import Svg from './square_svg.jsx'
import './stop.scss'

export default function(props) {
  return (
    <Svg {...props} >
      <rect className='stop-poly'
        x={ 10 }
        y={ 10 }
        width={ props.length * .7 }
        height={ props.length * .7 }
      />
    </Svg>
    )
}
