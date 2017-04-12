'use strict'

import React from 'react'
import './adder.scss'
import * as plus from './plus.png'

export default function(props) {
  return (
    <div className='timeline-region adder'
      onClick={ props.onClick }
    >
      <div className='button'>
        <img  src={plus.default} />
      </div>
      <div className='text'>
        <p>Add sound</p>
      </div>
    </div>
  )
}
