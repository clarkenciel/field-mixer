'use strict'

import React from 'react'
import './wait_field.scss'

export default function(props) {
  return (
    <div className='wait-field'>
      <p>Wait <input
          type='number'
          name='wait'
          min={ 0 }
          max={ 60 }
          step={ 5 }
          onChange={ e => props.onChange(Number(e.target.value)) }
          onKeyDown={
            e => {
              const val = e.target.value
              if (e.key === 'Backspace') {
                props.onChange(Number(val.slice(0, val.length - 1)))
              }
              else {
                props.onChange(Number(val))
              }
            }
          }
          value={ props.value || 0 }
        /> seconds</p>
    </div>
    )
}
