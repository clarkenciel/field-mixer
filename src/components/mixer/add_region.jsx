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
  display: 'flex',
  flexDirection: 'row'
})

const buttonStyle = {
  color: '#aaffaa',
  padding: 0,
  paddingLeft: '10px',
  paddingRight: '10px'
}

const textStyle = {
  padding: 0,
  paddingLeft: '10px',
  paddingRight: '10px'

}

export default function(props) {
  return (
    <div className='timeline-region adder'
      style={ style(props) }
      onClick={ props.onClick }
    >
      <div style={ buttonStyle }>
        <h3>➕</h3>
      </div>
      <div style={ textStyle }>
        <h4>Add sound</h4>
      </div>
    </div>
  )
}
