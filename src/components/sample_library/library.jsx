'use strict'

import React from 'react'
import LibraryRegion from '../region/library_region.jsx'
import CollapsedLibrary from './collapsed_library.jsx'
import ExpandedLibrary from './expanded_library.jsx'

const libraryStyle = {
  border: '2px solid black',
  // borderBottom: '1px solid black'
  padding: '1px'
}

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
      />
    )
  })

  const lib = props.collapsed ?
    <CollapsedLibrary /> :
    <ExpandedLibrary columnWidth={columnWidth} samples={samples} />

  return (
    <div
      id='sample-library'
      style={ libraryStyle }>
      { lib }
    </div>
  )
}
