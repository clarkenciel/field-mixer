'use strict'

import React from 'react'

const style = props => ({
  backgroundColor: props.isPlaying ? '#448844' : '#333333',
  color: props.isPlaying ? '#ffffff' : '#aaaaaa',
  width: '100%',
  margin: 0,
  marginTop: '1px',
  textAlign: 'center',
  overflowX: 'hidden',
  overflowY: 'initial',
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