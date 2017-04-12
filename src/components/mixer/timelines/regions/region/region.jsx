'use strict'

import React from 'react'
import './region.scss'
import * as x from './x.png'

export default function(props) {
  return (
    <div className={ 'timeline-region' + (props.isPlaying ? ' playing' : ' stopped') }>
      <div className='remove-button'
        onClick={ props.onRemove }
      >
        <img src={x.default} />
      </div>
      <div className='region-name'>
        <h4>{props.name}</h4>
      </div>
    </div>
  )
}
