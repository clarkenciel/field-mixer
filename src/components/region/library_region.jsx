'use strict'

import React from 'react'
import './library_region.scss'

const regionFilenameStyle = width => ({
  width: width
})

const regionDurationStyle = width => ({
  width: width
})

export default function(props) {
  return (
    <div
      className={ 'library-region' + (props.selected ? ' selected' : '') }
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
        <p>{ Math.round(props.region.lengthSeconds()) } sec.</p>
      </div>
    </div>
  )
}
