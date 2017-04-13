'use strict'

import React from 'react'
import Header from './header/header.jsx'
import Table from './table/table.jsx'
import './expanded_library.scss'


export default function(props) {
  return (
    <div className='library expanded'>
      <Header
        columnWidth={ props.columnWidth }
      />
      <Table >
        { props.samples }
        { props.loading }
      </Table>
    </div>
    )
}
