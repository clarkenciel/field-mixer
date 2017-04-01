'use strict'

import React from 'react'
import Header from './header.jsx'
import Table from './table.jsx'

export default function(props) {
  return (
    <div>
      <Header columnWidth={ props.columnWidth }/>
      <Table >
        { props.samples }
      </Table>
    </div>
    )
}
