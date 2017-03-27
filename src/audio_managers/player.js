const PlayerData = {
  region: null,
  context: null,
  node: null,
  initialized: false,
  playing: false,

  copyData(other) {
    other.region = this.region
    other.context = this.context
    other.node = this.node
  }
}

const PlayerCreator = Object.create(PlayerData)
PlayerCreator.create = function(context, region) {
    const nu = Object.create(FreshPlayer)
    nu.context = context
    nu.region = region
    return nu
  }
}

const FreshPlayer = Object.create(PlayerData)
FreshPlayer.initialize = function() {
  const nu = Object.create(InitializedPlayer)
  this.copyData(nu)
  nu.node = this.context.createBufferSource()
  nu.node.buffer = nu.region.buffer
  nu.initialized = true
  return nu
}

const InitializedPlayer = Object.create(PlayerData)
InitializedPlayer.play(offset) {
  const nu = Object.create(PlayingPlayer)
  this.copyData(nu)
  nu.node.start((offset || 0) + nu.region.startTime)
  nu.playing = true
  return nu
}

const PlayingPlayer = Object.create(PlayerData)
PlayingPlayer.stop() {
  const nu = Object.create(FreshPlayer)
  this.node.stop()
  this.copyData(nu)
  return nu.initializeNode()
}

const player = (context, region) => PlayerCreator.create(context, region)

export default player
