'use strict'

import React from 'react'
import LibraryRegion from '../region/library_region.jsx'
import Library from './expanded_library.jsx'
import Cover from './cover.jsx'

const style = props => ({
  display: props.visible ? 'block' : 'none',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  // border: '2px solid black',
  padding: '1px'
})

export default function(props) {
  const columnWidth = props.columnWidth || '25%'
console.log(props)
  const samples = props.samples.map((reg, idx) => {
    return (
      <LibraryRegion
        key={idx}
        fileName={ reg.fileName }
        region={ reg.region }
        columnWidth={ columnWidth }
        onClick={ props.onSampleClick }
      />
    )
  })

  const lib =
    <Library
      columnWidth={columnWidth}
      samples={samples}
    />

  return (
    <div
      id='sample-library'
      style={ style(props) }>
      <Cover onClick={ props.onCoverClick }/>

      <div id='library-holder'
        style={{ zIndex: '100', position: 'absolute', left: '50%', top: '25%', width: '50%' }}>
        <div style={{ position: 'relative', left: '-50%' }} >
          { lib }
        </div>
      </div>
    </div>
    )
}
