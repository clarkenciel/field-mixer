'use strict'

import React from 'react'
import Control from './timeline_control_panel.jsx'
import RegionList from './region_list.jsx'

const style = props => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const controlPanelStyle = props => ({
  display: 'flex',
  backgroundColor: '#aaaaaa',
  flexDirection: 'row',
  padding: 0,
  paddingTop: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

const regionListStyle = props => ({
  display: 'flex',
  flexDirection: 'row',
  overflowY: 'scroll',
  overflowX: 'hide',
  // height: '100%'
  marginRight: '-10%',
  paddingRight: '6%'
})

export default function(props) {
  const controls = props.timelines.map((tl, idx) =>
    <Control key={ idx } {...tl}
      width={ 100 / props.timelines.length + '%' }
      pan={ tl.pan }
      gain={ tl.gain }
      onGainChange={ val => props.onGainChange(idx, Number(val.target.value)) }
      onPanChange={ val => props.onPanChange(idx, Number(val.target.value)) }
    />)

  const regions = props.timelines.map((tl, idx) => {
    return (
      <RegionList key={ idx } {...tl}
        regions={ tl.scheduledRegions() }
        width={ 100 / props.timelines.length + '%' }
        onAdd={ () => props.onAdd(idx) }
        onRemove={ regId => props.onRemove(idx, regId) }
      />)
    })

  return (
    <div
      className='mixer-timeline-section'
      style={ style(props) }
    >
      <div className='control-holder'
      >
        <div
          className='mixer-timeline-controls'
          style={ controlPanelStyle(props) }
        >
          { controls }
        </div>
      </div>

      <div className='region-holder'
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <div
          className='mixer-timeline-regions'
          style={ regionListStyle(props) }
        >
          { regions }
        </div>
      </div>
    </div>
    )
      }
