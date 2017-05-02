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
      'piano1.wav',
      'piano2.wav',
      'piano3.wav',
      'piano4.wav',
    ]


    return {      
      library: null,
      visible: false
    }
  }

  reduce(state, action) {
    switch(action.type) {
    case Lat.FETCH_FILES:
      state.fileRequest = api.getFileList()
      	.then(La.loadLibrary)
      	.catch(error => {
      	  console.log("File list get error: ", error)
      	})

      state.library = Library([], [])
      return Object.create(state)
      
    case Lat.START_LOAD:      
      const loadingFiles = action.fileList
        .map(fname =>
             api
             .getFile(fname)
             .catch(console.log))

      const loaders = action.fileList
            .map(fname => delayed(fname))

      state.fileRequest = Promise.all(loadingFiles)
        .spread((...buffers) =>
		La.addItems(
		  buffers.map((buf, idx) =>
			      resolved(action.fileList[idx], Region.fromBuffer(buf)))))

      loaders.forEach(l => state.library.loadingItems.add(l))

      return Object.create(state)

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
