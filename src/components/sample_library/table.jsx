'use strict'

import React from 'react'

const style = props => ({
  overflowY: 'scroll',
  height: '200px'
})

export default function(props) {
  return (
    <div
      className='table'
      style={ style(props) }
    >
      { props.children }
    </div>
  )
}
