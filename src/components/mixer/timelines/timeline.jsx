'use strict'

import React from 'react'
import Controls from './control_panel/control_panel.jsx'
import RegionList from './region_list/region_list.jsx'
import './timeline.scss'

const style = props => ({
  // width: props.width
})

export default function(props) {
  return (
    <div
      id={ props.position || null }
      className={ 'timeline' + (props.inView ? ' visible' : ' hidden') }
      style={ style(props) }
    >
      <div className='title-holder'>
        <div className='title'>
          <p>Channel: { props.id }</p>
        </div>
      </div>
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
          onAdd={ props.onAdd }
          onRemove={ props.onRemove }
        />
      </div>
    </div>
  )
}
