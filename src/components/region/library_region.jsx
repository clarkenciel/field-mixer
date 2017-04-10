'use strict'

import React from 'react'

const regionStyle = selected => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignContent: 'space-around',
  paddingLeft: '4px',
  backgroundColor: selected ? 'blue' : 'white',
  borderTop: '1px solid black',
  cursor: 'pointer'
})

const regionFilenameStyle = width => ({
  margin: 0,
  marginLeft: '3px',
  marginRight: '3px',
  padding: 0,
  paddingLeft: '7px',
  paddingRight: 'auto',
  width: width
})

const regionDurationStyle = width => ({
  margin: 0,
  marginLeft: '3px',
  marginRight: '3px',
  padding: 0,
  paddingLeft: '7px',
  paddingRight: 'auto',
  width: width
})

export default function(props) {
  return (
    <div
      className='library-region'
      style={ regionStyle(props.selected) }
      onClick={ props.onClick }
    >
      <div
        className='region-filename'
        style={ regionFilenameStyle(props.columnWidth) }>
        <p>{props.fileName}</p>
      </div>
      <div
        className='region-duration'
        style={ regionDurationStyle(props.columnWidth) }>
        <p>{props.region.lengthSeconds()} sec.</p>
      </div>
    </div>
  )
}
