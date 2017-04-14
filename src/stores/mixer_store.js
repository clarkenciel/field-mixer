'use strict'

import { ReduceStore } from 'flux/utils'
import Dispatcher from '../dispatcher/app.js'
import Mixer from '../audio_managers/mixer.js'
import RelativeTimeline from '../audio_managers/relative_channel_timeline.js'
import { MixerActionTypes as Mat } from '../types.js'
import { LibraryActionTypes as Lat } from '../types.js'
import Ma from '../actions/mixer/dispatchers.js'
import Context from '../audio_context.js'

class MixerStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    const mixer = Mixer(Context)
    Array(4).fill(null).forEach(_ => mixer.appendTimeline(RelativeTimeline))
    mixer.onEnd(() => Ma.stop())
    return {
      mixer,
      timelineSelected: false,
      selectedTimeline: -1,
      timelineInView: 0
    }
  }

  reduce(state, action) {
    let tl, inView
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
        try { state.mixer.stop() }
        catch (e) { console.log(`STOP ERROR: ${e}`) }
        return Object.create(state)

      case Mat.PAUSE:
        state.mixer.pause()
        return Object.create(state)

      case Mat.RESUME:
        state.mixer.resume()
        return Object.create(state)

      case Mat.SET_PAN:
        state.mixer.timeline(action.tlId).setPan(action.panVal)
        return Object.create(state)

      case Mat.SET_GAIN:
        state.mixer.timeline(action.tlId).setGain(action.gainVal)
        return Object.create(state)

      case Mat.SELECT_TIMELINE:
        state.selectedTimeline = action.tlId
        state.timelineSelected = true
        return Object.create(state)

      case Mat.ADD_REGION:
        if (state.timelineSelected) {
          state.mixer.timeline(state.selectedTimeline).appendRegion(action.region)
          state.selectedTimeline = -1
          state.timelineSelected = false
          return Object.create(state)
        }
        else return state

      case Mat.NEXT_TIMELINE:
        inView = state.timelineInView
        state.timelineInView = (inView + 1) % state.mixer.timelines().length
        return Object.create(state)

      case Mat.PREV_TIMELINE:
        inView = state.timelineInView
        const len = state.mixer.timelines().length
        const prev = inView - 1
        state.timelineInView = ((prev % len) + len) % len
        return Object.create(state)

      case Mat.SET_REGION_WAIT:
        let { tlId, regId, val } = action
        let tl = state.mixer.timeline(tlId)
        if (val > 60) val = 60
        if (val < 0) val = 0
        tl.setRegionOffset(regId, val)
        return Object.create(state)

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
