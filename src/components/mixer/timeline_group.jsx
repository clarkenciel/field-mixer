'use strict'

import React from 'react'
import Control from './timeline_control_panel.jsx'
import RegionList from './region_list.jsx'

const style = props => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const controlPanelStyle = props => ({
  display: 'flex',
  backgroundColor: '#aaaaaa',
  flexDirection: 'row',
  padding: '10px',
})

const regionListStyle = props => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  overflowY: 'scroll',
  overflowX: 'hide',
})

export default function(props) {
  const controls = props.timelines.map((tl, idx) =>
    <Control key={ idx } {...tl}
      width={ 100 / props.timelines.length + '%' }
      onGainChange={ val => props.onGainChange(idx, val) }
      onPanChange={ val => props.onPanChange(idx, val) }
    />)

  const regions = props.timelines.map((tl, idx) =>
    <RegionList key={ idx } {...tl}
      width={ 100 / props.timelines.length + '%' }
      onAdd={ () => props.onAdd(idx) }
    />)

  return (
    <div
      className='mixer-timeline-section'
      style={ style(props) }
    >
      <div
        className='mixer-timeline-controls'
        style={ controlPanelStyle(props) }
      >
        { controls }
      </div>
      <div
        className='mixer-timeline-regions'
        style={ regionListStyle(props) }
      >
        { regions }
      </div>
    </div>
  )
}
