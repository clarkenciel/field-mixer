'use strict'

import React from 'react'
import './region.scss'
import WaitField from './wait_field.jsx'
import * as x from './x.png'

export default function(props) {
  return (
    <div className={ 'timeline-region' + (props.isPlaying ? ' playing' : ' stopped') }>
      <div className='remove-button'
        onClick={ props.onRemove }
      >
        <img src={x.default} />
      </div>
      <div className='region-data'>
        <div className='region-name'>
          <p clasName='name'>{props.name}</p>
        </div>
        <div className='region-wait'>
          <WaitField
            onChange={ props.onSetWait }
            value={ props.offset }
          />
        </div>
      </div>
    </div>
  )
}
