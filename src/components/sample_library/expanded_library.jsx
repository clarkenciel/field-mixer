'use strict'

import React from 'react'
import Header from './header.jsx'
import Table from './table.jsx'

const style = props => ({
  width: '100%',
  boxShadow: '#333333 0.1px 5px 200px 1px'
})

export default function(props) {
  return (
    <div style={ style(props) }>
      <Header columnWidth={ props.columnWidth }/>
      <Table >
        { props.samples }
      </Table>
    </div>
    )
}
