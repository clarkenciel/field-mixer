const ChainData = {
  context: null,
  gain: null,
  pan: null,
  buffer: null,
  playerNode: null,

  initialize(buffer) {
    this.playerNode = this.context.createBufferSource()
    this.playerNode.buffer = this.buffer
    this.playerNode.connect(this.gain)
  },

  play(delay, offset) {
    this.playerNode.start(delay || 0, offset || 0)
  },

  stop() {
    this.playerNode.stop()
    this.initialize()
  },

  setGain(val) {
    this.gain.gain.value = val
  },

  setPan(val) {
    this.pan.pan.value = val
  }
}

const create = context => {
  const nu = Object.create(ChainData)
  nu.context = context
  nu.gain = context.createGain()
  nu.pan = context.createStereoPanner()
  nu.pan.connect(nu.context.destination)
  nu.gain.connect(nu.pan)
  return nu
}

export default create
