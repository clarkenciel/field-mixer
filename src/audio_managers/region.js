const RegionData = {
  startTime: 0, // seconds
  endTime: 0,
  fileName: null,
  buffer: null,

  lengthMillis() { return this.buffer.length / (this.buffer.sampleRate * 0.001) },

  lengthSeconds() { return this.buffer.length / this.buffer.sampleRate },

  endMillis() { return (this.startTime * 1000) + this.lengthMillis() },

  endSeconds() { return this.startTime + this.lengthSeconds() },

  offset(offset) {
    const nu = Object.create(this)
    nu.startTime += offset
    return nu
  }
}

export default {
  fromBuffer(audioBuffer) {
    const nu = Object.create(RegionData)
    nu.buffer = audioBuffer
    return nu
  }
}
