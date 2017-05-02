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

const loadLibrary = fileList => ({
  type: Lat.START_LOAD,
  fileList
})

const getFiles = () => ({
  type: Lat.FETCH_FILES
})

export default {
  addItems,
  display,
  hide,
  loadLibrary,
  getFiles
}
