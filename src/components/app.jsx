'use strict'

import React from 'react'
import Mixer from './mixer/mixer.jsx'
import Library from './sample_library/library.jsx'

const style = props => ({
  position: 'absolute',
  top: props.dw * 0.05,
  left: props.dw * 0.05,
  width: props.dw * 0.9,
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
  return (
    <div
      id='app-contents'
      style={ style(props) }
    >
      <div id='mixer-holder'
        style={ mixerHolderStyle(props) }
      >
        <Mixer
          timelines={ props.timelines }
          playing={ props.playing }
        />
      </div>
      <div id='library-holder'
        style={ libraryHolderStyle(props) }
      >
        <Library
          columnWidth={ '50%' }
          collapsed={ props.libraryCollapsed }
          samples={ props.samples }
        />
      </div>
    </div>
    )
}
