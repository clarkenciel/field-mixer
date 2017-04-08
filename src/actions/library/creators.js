'use strict'

import { LibraryActionTypes as Lat } from '../../types.js'

const addItem = item => ({
  type: Lat.ADD_ITEM,
  item
})

const display = () => ({
  type: Lat.DISPLAY
})

const hide = () => ({
  type: Lat.HIDE
})

export default {
  addItem,
  display,
  hide
}
