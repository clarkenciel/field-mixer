'use strict'

import { ReduceStore } from 'flux/utils'
import { LibraryActionTypes as Lat } from '../types.js'
import Library from '../library_managers/library.js'
import Dispatcher from '../dispatcher/app.js'

class LibraryStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    return {
      library: Library(),
      visible: false
    }
  }

  reduce(state, action) {
    switch(action.type) {
      case Lat.ADD_ITEM:
        state.library.push(action.item)
        return Object.create(state)

      case Lat.DISPLAY:
        state.visible = true
        return Object.create(state)

      case Lat.HIDE:
        state.visible = false
        return Object.create(state)

      default:
        return state
    }
  }
}

export default new LibraryStore()
