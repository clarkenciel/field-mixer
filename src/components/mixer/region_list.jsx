'use strict'

import React from 'react'
import Region from './timeline_region.jsx'
import AddRegion from './add_region.jsx'

const style = props => ({
  width: props.width,
  margin: 0,
  // marginLeft: '10px'
  padding: 0,
  paddingLeft: '1px',
})

export default function(props) {
  const regions = props.regions && props.regions.map((region, idx) =>
    <Region
      key={idx}
      name={region.region.fileName}
      isPlaying={idx === props.currentlyPlayingRegion}
      onRemove={ () => props.onRemove(idx) }
    />)
  regions.push(<AddRegion key={ 'adder' } onClick={ props.onAdd }/>)

  return (
    <div className='region-list'
      style={ style(props) }
    >
      { regions }
    </div>
  )
}
