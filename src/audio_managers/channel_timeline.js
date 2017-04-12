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
      this._scheduledRegions.forEach((sr, idx) => {
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
    }
    if (region.onstart) this._players[idx].onStart(region.onstart)
    if (region.onend) this._players[idx].onEnd(region.onend)
    this._players[idx].setGain(this.gain)
    this._players[idx].setPan(this.pan)
    this._players[idx] = this._players[idx].play(region.start * 0.001)
  },

  setGain(nu) {
    this.gain = nu
    this._players.forEach(play =>
      play.setGain(this.gain)
    )
  },

  setPan(nu) {
    this.pan = nu
    this._players.forEach(play =>
      play.setPan(this.pan)
    )
  }
}

export default context => {
  const out = Object.create(TimeLineTraits)
  out.context = context
  out._players = []
  out._scheduledRegions = []
  out.setGain(0.5)
  out.setPan(0.0)
  return out
}
