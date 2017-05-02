'use strict'

import React from 'react'
import Mixer from './mixer/mixer.jsx'
import Library from './sample_library/library.jsx'
import LA from '../actions/library/dispatchers.js'
import './app.scss'

const style = props => ({
  width: '100%',
  height: '100%',
  maxWidth: '1700px',
  height: '90vh',
  margin: 'auto',
})

const mixerHolderStyle = props => ({
  position: 'relative',
  height: '95%',
})

export default function(props) {
  const { library } = props.libraryProps
  
  if (!library) {
    window.setTimeout(
      LA.getFiles,
      0
    )
  }
  
  const lib = !props.libraryProps.visible ?
	null :
	<Library
  columnWidth={ '50%' }
  loading={ library ? library.loadingItems : [] }
  items={ library ? library.items : [] }
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
