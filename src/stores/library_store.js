'use strict'

import { Promise } from 'bluebird'
import { ReduceStore } from 'flux/utils'
import { LibraryActionTypes as Lat } from '../types.js'
import Library from '../library_managers/library.js'
import Dispatcher from '../dispatcher/app.js'
import Region from '../audio_managers/region.js'
import { errored, delayed, resolved } from '../library_managers/delayed_record.js'
import api from '../api/inglewood.js'
import La from '../actions/library/dispatchers.js'

class LibraryStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    const files = [
      'park1.wav',
      'park2.wav',
      'park3.wav',
      'park4.wav',
      'park5.wav',
      'park6.wav',
      'park7.wav',
      'park8.wav',
      'park9.wav',
      'park10.wav',
      'park11.wav',
      'piano1.aif',
      'piano2.aif',
      'piano3.aif',
      'piano4.aif',
    ]

    const loadingFiles = files
      .map(fname => api.getFile(fname).catch(e => errored(e)))

    const loaders = files
      .map(fname => delayed(fname))

    Promise.all(loadingFiles)
      .spread((...buffers) =>
        La.addItems(
          buffers.map((buf, idx) =>
            resolved(files[idx], Region.fromBuffer(buf)))))

    return {
      library: Library([], loaders),
      visible: false
    }
  }

  reduce(state, action) {
    switch(action.type) {
      case Lat.ADD_ITEMS:
        action.items.forEach(i => state.library.addItem(i))
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
