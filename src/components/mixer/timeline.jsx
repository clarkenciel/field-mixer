'use strict'

import React from 'react'
import Controls from './timeline_control_panel.jsx'
import RegionList from './region_list.jsx'

const style = props => ({
  margin: 0,
  marginLeft: '3px',
  padding: 0,
  paddingLeft: '1px',
  paddingRight: '1px',
  width: props.width
})

export default function(props) {
  return (
    <div
      className='timeline'
      style={ style(props) }
    >
      <div
        className='controls-holder'
      >
        <Controls
          gain={ props.gain }
          pan={ props.pan }
          onGainChange={ props.onGainChange || console.log }
          onPanChange={ props.onPanChange || console.log }
        />
      </div>
      <div className='region-list-holder'>
        <RegionList
          regions={ props.regions }
          currentlyPlayingRegion={ props.currentlyPlayingRegion }
          onAdd={ props.onAdd }
          onRemove={ props.onRemove }
        />
      </div>
    </div>
  )
}
