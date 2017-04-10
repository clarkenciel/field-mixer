import Chain from './audio_chain.js'

const PlayerData = {
  chain: null,
  buffer: null,
  initialized: false,
  playing: false,

  copyData(other) {
    other.buffer = this.buffer
    other.chain = this.chain
  },

  setGain(val) {
    this.chain.setGain(val)
  },

  setPan(val) {
    this.chain.setPan(val)
  },

  onStart(f) {
    this.chain.onStart(() => {
      f(this)
    })
  },

  onEnd(f) {
    this.chain.onEnd(chain => {
      f(this)
    })
  }
}

const PlayerCreator = Object.create(PlayerData)
PlayerCreator.create = function(context, buffer) {
  const nu = Object.create(FreshPlayer)
  nu.chain = Chain(context)
  nu.buffer = buffer
  return nu
}

const FreshPlayer = Object.create(PlayerData)
FreshPlayer.initialize = function() {
  const nu = Object.create(InitializedPlayer)
  this.copyData(nu)
  nu.chain.initialize(nu.buffer)
  return nu
}

const InitializedPlayer = Object.create(PlayerData)
InitializedPlayer.initialized = true

InitializedPlayer.play = function(delay, offset) {
  const nu = Object.create(PlayingPlayer)
  this.copyData(nu)
  nu.chain.play(delay || 0, offset)
  nu.initialized = this.initialized
  return nu
}

const PlayingPlayer = Object.create(PlayerData)
PlayingPlayer.playing = true

PlayingPlayer.stop = function() {
  const nu = Object.create(FreshPlayer)
  this.chain.stop()
  this.copyData(nu)
  return nu.initialize()
}

const player = (context, buffer) => PlayerCreator.create(context, buffer)

export default player
