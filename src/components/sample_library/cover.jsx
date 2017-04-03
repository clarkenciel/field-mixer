'use static'

import React from 'react'

const style = props => ({
  width: '100%',
  height: '100%',
  zIndex: 10,
  backgroundColor: 'rgba(100,100,100,0.3)'
})

export default function(props) {
  return (
    <div id='sample_lib_cover'
      style={style(props)}
      onClick={props.onClick}
    >
    </div>
    )
}
