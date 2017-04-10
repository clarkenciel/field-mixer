'use strict'

import { LibraryActionTypes as Lat } from '../../types.js'

const addItems = items => ({
  type: Lat.ADD_ITEMS,
  items
})

const display = () => ({
  type: Lat.DISPLAY
})

const hide = () => ({
  type: Lat.HIDE
})

export default {
  addItems,
  display,
  hide
}
