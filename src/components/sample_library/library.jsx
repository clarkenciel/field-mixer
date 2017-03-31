'use strict'

import React from 'react'
import LibraryRegion from '../region/library_region.jsx'
import LibraryHeader from './header.jsx'
import LibraryTable from './table.jsx'

const libraryStyle = {
  border: '2px solid black',
  // borderBottom: '1px solid black'
  padding: '1px'
}

export default function(props) {
  const columnWidth = props.columnWidth || '25%'
console.log(props)
  const samples = props.regions.map((reg, idx) => {
    return (
      <LibraryRegion
        key={idx}
        fileName={ reg.fileName }
        region={ reg.region }
        columnWidth={ columnWidth }
      />
    )
  })

  return (
    <div
      id='sample-library'
      style={ libraryStyle }>
      <LibraryHeader columnWidth={ columnWidth }/>
      <LibraryTable >
        { samples }
      </LibraryTable>
    </div>
  )
}
