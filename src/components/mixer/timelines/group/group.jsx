'use strict'

import React from 'react'
import Control from '../control_panel/control_panel.jsx'
import Timeline from '../timeline.jsx'
import RegionList from '../region_list/region_list.jsx'
import './group.scss'

const posId = (idx, max) => {
  if (idx === 0) return 'first'
  else if (idx === max) return 'last'
  else return null
}

export default function(props) {

  const tls = props.timelines.map((tl, idx) => {
    return (
      <Timeline
        key={ idx }
        id={ idx + 1 }
        inView={ props.inView === idx }
        position={ posId(idx, props.timelines.length-1) }
        width={ 100 / props.timelines.length + '%' }
        gain={ tl.gain }
        pan={ tl.pan }
        onGainChange={ val => props.onGainChange(idx, Number(val.target.value)) }
        onPanChange={ val => props.onPanChange(idx, Number(val.target.value)) }
        regions={ tl.scheduledRegions() }
        onAdd={ () => props.onAdd(idx) }
        onRemove={ regId => props.onRemove(idx, regId) }
        onSetRegionWait={ (regId, val) => props.onSetRegionWait(idx, regId, val) }
      />
    )
  })

  return (
    <div className='mixer-timeline-section'>
      { tls }
    </div>
  )
}
