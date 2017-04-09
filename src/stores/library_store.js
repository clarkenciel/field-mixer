'use strict'

import { ReduceStore } from 'flux/utils'
import { LibraryActionTypes as Lat } from '../types.js'
import Library from '../library_managers/library.js'
import Dispatcher from '../dispatcher/app.js'
import Region from '../audio_managers/region.js'
import ctx from '../audio_context.js'

class LibraryStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    const buf = ctx.createBuffer(2, 44100, ctx.sampleRate)
    const bufs = Array(4).fill(null).map((_, idx) => {
      const out = Region.fromBuffer(buf)
      out.fileName = idx + '.wav'
      return out
    })
    return {
      library: Library(bufs),
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
