'use strict'

import { ReduceStore } from 'flux/utils'
import Dispatcher from '../dispatcher/app.js'
import Mixer from '../audio_managers/mixer.js'
import RelativeTimeline from '../audio_managers/relative_channel_timeline.js'
import { MixerActionTypes as Mat } from '../types.js'
import { LibraryActionTypes as Lat } from '../types.js'
import Context from '../audio_context.js'

class MixerStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    const mixer = Mixer(Context)
    Array(4).fill(null).forEach(_ => mixer.appendTimeline(RelativeTimeline))
    return {
      mixer,
      timelineSelected: false,
      selectedTimeline: -1
    }
  }

  reduce(state, action) {
    let tl
    switch(action.type) {
      case Mat.APPEND_REGION:
        state.mixer.timeline(action.tlIdx).
          appendRegion(action.region)
        return Object.create(state)

      case Mat.PREPEND_REGION:

        state.mixer.timeline(action.tlIdx).
          prependRegion(action.region)
        return Object.create(state)

      case Mat.INSERT_REGION:
        state.mixer.timeline(action.tlIdx).
          insertAt(
            action.regIdx,
            action.region
          )
        return Object.create(state)

      case Mat.POP_REGION:
        state.mixer.timeline(action.tlIdx).popRegion()
        return Object.create(state)

      case Mat.SHIFT_REGION:
        state.mixer.timeline(action.tlIdx).shiftRegion()
        return Object.create(state)

      case Mat.REMOVE_REGION:
        tl = state.mixer.timeline(action.tlIdx)
        tl.removeAt(action.regIdx)
        return Object.create(state)

      case Mat.PLAY:
        state.mixer.play()
        return Object.create(state)

      case Mat.STOP:
        state.mixer.stop()
        return Object.create(state)

      case Mat.PAUSE:
        state.mixer.pause()
        return Object.create(state)

      case Mat.RESUME:
        state.mixer.resume()
        return Object.create(state)

      case Mat.SET_PAN:
        state.mixer.timeline(action.tlId).pan = action.panVal
        return Object.create(state)

      case Mat.SET_GAIN:
        state.mixer.timeline(action.tlId).gain = action.gainVal
        return Object.create(state)

      case Mat.SELECT_TIMELINE:
        state.selectedTimeline = action.tlId
        state.timelineSelected = true
        return Object.create(state)

      case Mat.ADD_REGION:
        if (state.timelineSelected) {
          mixer.timeline(state.selectedTimeline).appendRegion(action.region)
          state.selectedTimeline = -1
          state.timelineSelected = false
          return Object.create(state)
        }
        else return state

      case Lat.HIDE:
        state.timelineSelected = false
        state.selectedTimeline = -1
        return Object.create(state)

      default:
        return state
    }
  }
}

export default new MixerStore()
