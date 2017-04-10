'use strict'

import React from 'react'
import Sample from '../region/library_region.jsx'
import LoadingSample from './loading_sample/loading_sample.jsx'
import Library from './expanded_library.jsx'
import Cover from './cover.jsx'

const style = props => ({
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
  const samples = props.items.map((reg, idx) => {
    return (
      <Sample
        key={idx}
        fileName={ reg.fileName }
        region={ reg }
        columnWidth={ columnWidth }
        onClick={ () => props.onSampleClick(reg) }
      />
    )
  })

  const loadingSamples = props.loading.map((rec, idx) => {
    return (
      <LoadingSample
        name={ rec.name }
        key={ idx }
      />
      )
  })

  const lib =
    <Library
      columnWidth={columnWidth}
      samples={samples}
      loading={ loadingSamples }
    />

  return (
    <div
      id='sample-library'
      style={ style(props) }>
      <Cover onClick={ props.onCoverClick }/>

      <div id='library-holder'
        onClick={ props.onCoverClick }
        style={{ zIndex: '100', position: 'absolute', left: '50%', top: '25%', width: '50%' }}>
        <div style={{ position: 'relative', left: '-50%' }} >
          { lib }
        </div>
      </div>
    </div>
    )
}
