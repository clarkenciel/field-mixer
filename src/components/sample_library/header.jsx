'use strict'

import React from 'react'

const headerStyle = {
  display: 'fex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  padding: 0,
  paddingLeft: '10px',
  backgroundColor: '#999999'
}

const titleColumnStyle = width => ({
  width: width,
  margin: 0,
  // padding: 0,
  display: 'inline-block'
})

const durationColumnStyle = width => ({
  width: width,
  margin: 0,
  // padding: 0,
  display: 'inline-block'
})

export default function(props) {
  return (
    <div
      className='header'
      style={ headerStyle }
    >
      <div style={ titleColumnStyle(props.columnWidth) }>
        <p>File name</p>
      </div>
      <div style={ durationColumnStyle(props.columnWidth) }>
        <p>Duration</p>
      </div>
    </div>
  )
}
