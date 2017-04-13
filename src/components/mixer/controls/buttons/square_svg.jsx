'use strict'

import React from 'react'

export default function(props) {
  return (
    <svg onClick={ props.onClick } height={ props.length } width={ props.length } >
      { props.children }
    </svg>
  )
}
