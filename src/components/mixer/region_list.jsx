'use strict'

import React from 'react'
import Region from './timeline_region.jsx'

export default function(props) {
  const regions = props.regions && props.regions.map((region, idx) =>
    <Region
      key={idx}
      name={region.fileName}
      isPlaying={idx === props.currentlyPlayingRegion} />)

  return (
    <div className='region-list' >
      { regions }
    </div>
  )
}
