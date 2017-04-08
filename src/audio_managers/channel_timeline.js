'use strict'

import Player from './player.js'

const TimeLineTraits = {
  _scheduledRegions: [],
  _players: [],
  _pausedAt: null,

  scheduledRegions() { return this._scheduledRegions },
  players() { return this._players },
  pausedAt() { return this._pausedAt },

  play() {
    if (this._pausedAt)
      this.resume()
    else {
      this._scheduledRegions.forEach((sr, idx) => {
        this._playPlayer(idx, sr)
      })
    }
  },

  stop() {
    this._players = this._players.map(p => p.stop())
  },

  pause(time) {
    this._pausedAt = time
    this.stop()
  },

  resume() {
    if (!this._pausedAt)
      this.play()
    else {
      // console.log('timeline resume', this._pausedAt)
      this._scheduledRegions.forEach((sr, idx) => {
        // console.log('timeline resume > region start', sr.start)
        if (sr.start >= this._pausedAt)
          this._playPlayer(idx, sr)
      })
      this._pausedAt = null
    }
  },

  onOnset(idx, f) {
    const reg = this._scheduledRegions[idx]
    if (reg) {
      reg.onStart(() => {
        f({
          currentTime: this.context.currentTime * 1000,
          region: reg
        })
      })
    }
  },

  onRegionEnd(idx, f) {
    const reg = this._scheduledRegions[idx]
    if (reg) {
      reg.onEnd(() => {
        f({
          currentTime: this.context.currentTime * 1000,
          region: reg
        })
      })
    }
  },

  _playPlayer(idx, region) {
    if (!this._players[idx]) {
      this._players[idx] = Player(this.context, region.region.buffer).initialize()
      if (region.onstart) this._players[idx].onStart(region.onstart)
      if (region.onend) this._players[idx].onEnd(region.onend)
    }
    this._players[idx] = this._players[idx].play(region.start * 0.001)
  }
}

export default context => {
  const out = Object.create(TimeLineTraits)
  out.context = context
  out._players = []
  out._scheduledRegions = []
  out.gain = 0.0
  out.pan = 0.0
  return out
}
