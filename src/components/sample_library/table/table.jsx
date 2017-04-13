'use strict'

import React from 'react'
import './table.scss'

export default function(props) {
  return (
    <div
      className='table'
    >
      { props.children }
    </div>
  )
}
