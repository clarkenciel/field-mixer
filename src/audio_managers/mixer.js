const MixerData = {
  timelines() { return this._timelines },
  size() { return this._timelines.length },
  timeline(idx) { return this._timelines[idx] },

  appendTimeline(timelineType) {
    const nu = timelineType(this.context)
    this._timelines.push(nu)
    return nu
  },

  prependTimeline(timelineType) {
    const nu = timelineType(this.context)
    this._timelines = [nu].concat(this._timelines)
    return nu
  },

  insertTimeline(idx, timelineType) {
    idx = idx > this.size() ? this.size() : idx
    idx = idx < 0 ? 0 : idx
    const nu = timelineType(this.context)
    this._timelines = this._timelines.slice(0, idx).
      concat(nu).
      concat(this._timelines.slice(idx))
    return nu
  },

  popTimeline() {
    const out = this._timelines.pop()
    return out
  },

  shiftTimeline() {
    const out = this._timelines.shift()
    return out
  },

  removeTimelineAt(idx) {
    const out = this._timelines[idx]
    this._timelines = this._timelines.slice(0, idx).
      concat(this._timelines.slice(idx + 1))
    return out
  }
}

export default context => {
  const out = Object.create(MixerData)
  out._timelines = []
  out.context = context
  return out
}
