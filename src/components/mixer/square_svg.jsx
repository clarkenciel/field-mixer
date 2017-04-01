'use strict'

import React from 'react'

export default function(props) {
  return (
    <svg height={ props.length } width={ props.length } >
      { props.children }
    </svg>
  )
}
