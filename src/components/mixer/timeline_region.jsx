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
  display: 'flex',
  flexDirection: 'row'
})

const buttonStyle = props => ({
  padding: 0,
  paddingLeft: '10px',
  paddingRight: '10px',
  cursor: 'pointer',
  color: '#ffaaaa'
})

const nameStyle = props => ({
  padding: 0,
  paddingLeft: '10px',
  paddingRight: '10px',
})

export default function(props) {
  return (
    <div className='timeline-region'
      style={ style(props) }
    >
      <div className='remove-button'
        onClick={ props.onRemove }
        style={ buttonStyle(props) }
      >
        <h3>❌</h3>
      </div>
      <div className='region-name'
        style={ nameStyle(props) }
      >
        <h4>{props.name}</h4>
      </div>
    </div>
  )
}
