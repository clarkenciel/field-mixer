'use strict'

import React from 'react'

const style = props => ({
  backgroundColor: '#333333',
  color: '#dddddd',
  width: '100%',
  margin: 0,
  marginTop: '1px',
  textAlign: 'center',
  overflowX: 'hidden',
  overflowY: 'initial',
  cursor: 'pointer',
})

export default function(props) {
  return (
    <div className='timeline-region adder'
      style={ style(props) }
      onClick={ props.onClick }
    >
      <p>+ Add sound</p>
    </div>
  )
}
