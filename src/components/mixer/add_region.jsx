'use strict'

import React from 'react'
import * as plus from './plus.png'

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
  paddingRight: '10px',
  display: 'flex',
  alignContent: 'center'
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
        <img src={plus.default} style={{ margin: 'auto', height: '20px', width: '20px' }}/>
      </div>
      <div style={ textStyle }>
        <h4>Add sound</h4>
      </div>
    </div>
  )
}
