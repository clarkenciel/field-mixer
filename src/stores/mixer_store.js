'use strict'

import { ReduceStore } from 'flux/utils'
import Dispatcher from '../dispatcher/app.js'
import Mixer from '../audio_managers/mixer.js'
import RelativeTimeline from '../audio_managers/relative_channel_timeline.js'
import { MixerActionTypes as Mat } from '../types.js'
import Context from '../audio_context.js'

class MixerStore extends ReduceStore {
  constructor() { super(Dispatcher) }

  getInitialState() {
    const mixer = Mixer(Context)
    Array(4).fill(null).forEach(_ => mixer.appendTimeline(RelativeTimeline))
    return mixer
  }

  reduce(mixer, action) {
    let tl
    switch(action.type) {
      case Mat.APPEND_REGION:
        tl = mixer.timeline(action.tlIdx)
        tl.insertAt(
          tl.scheduledRegions().length,
          action.region
        )
        return Object.create(mixer)

      case Mat.PREPEND_REGION:
        mixer.timeline(action.tlIdx).
          insertAt(0, action.region)
        return Object.create(mixer)

      case Mat.INSERT_REGION:
        tl = mixer.timeline(action.tlIdx)
        tl.insertAt(
          action.regIdx,
          action.region
        )
        return Object.create(mixer)

      case Mat.POP_REGION:
        tl = mixer.timeline(action.tlIdx)
        tl.removeAt(tl.scheduledRegions().length - 1)
        return Object.create(mixer)

      case Mat.SHIFT_REGION:
        mixer.timeline(action.tlIdx).removeAt(0)
        return Object.create(mixer)

      case Mat.REMOVE_REGION:
        tl = mixer.timeline(action.tlIdx)
        tl.removeAt(action.regIdx)
        return Object.create(mixer)

      case Mat.PLAY:
        mixer.timelines().forEach((tl, idx) => {
          tl.play()
        })
        return Object.create(mixer)

      case Mat.STOP:
        mixer.timelines().forEach(tl => tl.stop())
        return Object.create(mixer)

      default:
        return mixer
    }
  }
}

export default new MixerStore()
