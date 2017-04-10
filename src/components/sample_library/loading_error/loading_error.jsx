'use strict'

import React from 'react'

export default function(props) {
  return (
    <div className='loading-sample-error'>
      <div>
        <h5>LOADING ERROR</h5>
      </div>
      <div>
        <p>{ props.name }: { props.err }</p>
      </div>
    </div>
  )
}
