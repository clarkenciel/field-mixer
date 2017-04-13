'use strict'

import React from 'react'
import * as icon from './icon.gif'
import './style.scss'

export default function(props) {
  return (
    <div className='loading-sample'>
      <div className='icon'>
        <img src={ icon.default } />
      </div>
      <div className='name'>
        <p>{ props.name }</p>
      </div>
    </div>
  )
}
