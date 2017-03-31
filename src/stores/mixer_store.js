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
        mixer.timeline(action.tlIdx).
          appendRegion(action.region)
        return Object.create(mixer)

      case Mat.PREPEND_REGION:

        mixer.timeline(action.tlIdx).
          prependRegion(action.region)
        return Object.create(mixer)

      case Mat.INSERT_REGION:
        mixer.timeline(action.tlIdx).
          insertAt(
            action.regIdx,
            action.region
          )
        return Object.create(mixer)

      case Mat.POP_REGION:
        mixer.timeline(action.tlIdx).popRegion()
        return Object.create(mixer)

      case Mat.SHIFT_REGION:
        mixer.timeline(action.tlIdx).shiftRegion()
        return Object.create(mixer)

      case Mat.REMOVE_REGION:
        tl = mixer.timeline(action.tlIdx)
        tl.removeAt(action.regIdx)
        return Object.create(mixer)

      case Mat.PLAY:
        mixer.play()
        return Object.create(mixer)

      case Mat.STOP:
        mixer.stop()
        mixer.timelines().forEach(tl => tl.stop())
        return Object.create(mixer)

      case Mat.PAUSE:
        mixer.pause()
        return Object.create(mixer)

      case Mat.RESUME:
        mixer.resume()
        return Object.create(mixer)

      default:
        return mixer
    }
  }
}

export default new MixerStore()
