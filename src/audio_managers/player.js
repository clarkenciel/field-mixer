import Chain from './audio_chain.js'

const PlayerData = {
  chain: null,
  region: null,
  initialized: false,
  playing: false,

  copyData(other) {
    other.region = this.region
    other.chain = this.chain
  },

  setGain(val) {
    chain.setGain(val)
  },

  setPan(val) {
    chain.setGain(val)
  }
}

const PlayerCreator = Object.create(PlayerData)
PlayerCreator.create = function(context, region) {
  const nu = Object.create(FreshPlayer)
  nu.region = region
  nu.chain = Chain(context)
  return nu
}

const FreshPlayer = Object.create(PlayerData)
FreshPlayer.initialize = function() {
  const nu = Object.create(InitializedPlayer)
  this.copyData(nu)
  nu.chain.initialize(nu.region.buffer)
  return nu
}

const InitializedPlayer = Object.create(PlayerData)
InitializedPlayer.initialized = true

InitializedPlayer.play = function(delay, offset) {
  const nu = Object.create(PlayingPlayer)
  this.copyData(nu)
  nu.chain.play((offset || 0) + nu.region.startTime, offset)
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

const player = (context, region) => PlayerCreator.create(context, region)

export default player
