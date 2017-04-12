'use strict'

import React from 'react'
import Region from '../regions/region/region.jsx'
import AddRegion from '../regions/adder/adder.jsx'
import './region_list.scss'

const style = props => ({
  width: props.width,
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
