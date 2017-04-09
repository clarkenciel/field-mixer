'use strict'

import React from 'react'
import Mixer from './mixer/mixer.jsx'
import Library from './sample_library/library.jsx'

const style = props => ({
  width: '100%',
  height: '100%',
  maxWidth: '900px',
  height: props.dh,
  margin: 'auto',
})

const mixerHolderStyle = props => ({
  position: 'relative',
  height: props.dh * 0.7
})

const libraryHolderStyle = props => ({
  position: 'relative',
  height: props.dh * 0.2
})

export default function(props) {
  const lib = !props.libraryProps.visible ?
    null :
    <Library
      columnWidth={ '50%' }
      { ...props.libraryProps }
    />

  return (
    <div
      id='app-contents'
      style={ style(props) }
    >
      { lib }
      <div id='mixer-holder'
        style={ mixerHolderStyle(props) }
      >
        <Mixer
          { ...props.mixerProps }
        />
      </div>
    </div>
    )
}
