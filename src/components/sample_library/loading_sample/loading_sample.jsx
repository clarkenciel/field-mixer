'use strict'

import React from 'react'
import * as icon from './icon.gif'
import './style.scss'

export default function(props) {
  return (
    <div className='loading-sample'>
      <div>
        <img src={ icon.default } style={{ height: '10%', width: '10%' }} />
      </div>
      <div>
        <p>{ props.name }</p>
      </div>
    </div>
  )
}
