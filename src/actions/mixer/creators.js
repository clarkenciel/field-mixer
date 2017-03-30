'use strict'

import { MixerActionTypes as Mat } from '../../types.js'

const appendRegion = (tlIdx, region) => ({
  type: Mat.APPEND_REGION,
  tlIdx,
  region
})

const prependRegion = (tlIdx, region) => ({
  type: Mat.PREPEND_REGION,
  tlIdx,
  region
})

const insertRegion = (tlIdx, regIdx, region) => ({
  type: Mat.INSERT_REGION,
  tlIdx,
  regIdx,
  region
})

const popRegion = tlIdx => ({
  type: Mat.POP_REGION,
  tlIdx
})

const shiftRegion = tlIdx => ({
  type: Mat.SHIFT_REGION,
  tlIdx
})

const removeRegion = (tlIdx, regIdx) => ({
  type: Mat.REMOVE_REGION,
  tlIdx,
  regIdx
})

const play = () => ({
  type: Mat.PLAY
})

const stop = () => ({
  type: Mat.STOP
})

const pause = () => ({
  type: Mat.PAUSE
})

const resume = () => ({
  type: Mat.RESUME
})

export default {
  appendRegion,
  prependRegion,
  insertRegion,

  popRegion,
  shiftRegion,
  removeRegion,

  play,
  stop,
  pause,
  resume
}
