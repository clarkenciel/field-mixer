'use strict'

import React from 'react'

const style = props => ({
  backgroundColor: props.isPlaying ? '#448844' : '#333333',
  color: props.isPlaying ? '#ffffff' : '#aaaaaa',
  padding: '2px',
  margin: 0,
  textAlign: 'center',
  fontSize: '180%'
})

export default function(props) {
  return (
    <div className='timeline-region'
      style={ style(props) }
    >
      <p>{props.name}</p>
    </div>
  )
}
