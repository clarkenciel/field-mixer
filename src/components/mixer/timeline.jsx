'use strict'

import React from 'react'
import Controls from './timeline_control_panel.jsx'
import RegionList from './region_list.jsx'

const tlStyle = props => ({
})

export default function(props) {
  return (
    <div className='timeline'>
      <div className='controls-holder'>
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
        />
      </div>
    </div>
  )
}
