'use strict'

const ScheduledRegionTraits = {
  overlapsLeft(other) {
    return this.start <= other.start && other.start < this.end
  },

  overlapsRight(other) {
    return other.overlapsLeft(this)
  },

  contains(other) {
    return this.start <= other.start && other.end < this.end
  },

  isWithin(other) {
    return other.contains(this)
  },

  onStart(f) {
    this.onstart = f
  },

  onEnd(f) {
    this.onend = f
  }
}

export default (start, end, region) => {
  const out = Object.create(ScheduledRegionTraits)
  out.start = start
  out.end = end
  out.region = region
  return out
}
