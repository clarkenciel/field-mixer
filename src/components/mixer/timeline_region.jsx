'use strict'

import React from 'react'

const style = props => ({
  backgroundColor: props.isPlaying ? '#448844' : '#333333',
  color: props.isPlaying ? '#ffffff' : '#aaaaaa',
  // padding: 0,
  // paddingLeft: '10px',
  // paddingRigth: '10px',
  width: '100%',
  // height: '20px',
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
