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
  },

  play() {
    this._startTime = this.context.currentTime * 1000
    this._timeAtResume = this._startTime
    this._runTime = 0
    this._timelines.forEach(tl => tl.play(this._startTime))
    this._playing = true
  },

  playing() {
    return !!this._playing
  },

  stop() {
    this._timelines.forEach(tl => tl.stop())
    this._playing = false
  },

  pause() {
    // console.log('mixer pause', this._pauseTime, this._timeAtResume, this.context.currentTime * 1000)
    this._pauseTime = (this.context.currentTime * 1000) - this._timeAtResume
    this._runTime += this._pauseTime - this._startTime
    this._timelines.forEach(tl => tl.pause(this._pauseTime))
    this._playing = false
  },

  resume() {
    // console.log('mixer resume 1', this._timeAtResume)
    this._timeAtResume = this.context.currentTime * 1000
    // console.log('mixer resume 2', this._timeAtResume)
    this._timelines.forEach(tl => tl.resume())
    this._playing = true
  },
}

export default context => {
  const out = Object.create(MixerData)
  out._timelines = []
  out.context = context
  return out
}
