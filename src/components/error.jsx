'use strict'

import React from 'react'

export default function(props) {
  return (
    <div className='error'>
      <h1>{ props.header }</h1>
      <p>{ props.message }</p>
    </div>
  )
}
