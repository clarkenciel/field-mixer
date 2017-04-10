const ChainData = {
  context: null,
  gain: null,
  pan: null,
  buffer: null,
  playerNode: null,
  onstop: null,
  onstart: null,
  playing: false,

  initialize(buffer) {
    if (this.playerNode) this.playerNode.disconnect()
    this.buffer = buffer || this.buffer
    this.playerNode = this.context.createBufferSource()
    this.playerNode.buffer = this.buffer
    this.playerNode.connect(this.gain)
    this.playing = false
    this.playerNode.onended = _ => {
      if (this.onstop) {
        this.onstop(this)
        this.initialize()
      }
      else this.initialize()
    }
    return this
  },

  play(delay) {
    if (this.onstart) {
      setTimeout(this.onstart.bind(this), delay * 1000)
    }
    this.playerNode.start(this.context.currentTime + (delay || 0))
    this.playing = true
    return this
  },

  stop() {
    if (this.playing)
      this.playerNode.stop()
    return this.initialize()
  },

  setBuffer(buffer) {
    try { this.playerNode.stop() } catch (e) { console.log(e) }
    this.initialize(buffer)
    return this
  },

  setGain(val) {
    this.gain.gain.value = val
    return this
  },

  setPan(val) {
    this.pan.pan.value = val
    return this
  },

  onStart(f) {
    this.onstart = f
    return this
  },

  onEnd(f) {
    this.onstop = f
    // this.playerNode.onended = _ => {
    //   if (this.onstop) this.onstop(this)
    //   else this.initialize()
    // }
    return this
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
