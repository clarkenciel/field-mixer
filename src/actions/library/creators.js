'use strict'

import { LibraryActionTypes as Lat } from '../../types.js'

const addItem = item => ({
  type: Lat.ADD_ITEM,
  item
})

export default {
  addItem
}
