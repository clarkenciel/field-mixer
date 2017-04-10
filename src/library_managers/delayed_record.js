'use strict'

import Region from '../audio_managers/region.js'

export function delayed(name, promise) {
  return {
    name,
    loading: true,
    loaded: false,
    promise: promise
  }
}

export function resolved(name, data) {
  const buf = Region.fromBuffer(data.buffer)
  buf.fileName = name
  buf.name = name
  return buf
}

export function errored(name, err) {
  return {
    name,
    error: err
  }
}
