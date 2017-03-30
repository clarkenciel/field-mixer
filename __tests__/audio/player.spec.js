import 'web-audio-test-api'
import Player from '../../src/audio_managers/player.js'
import Region from '../../src/audio_managers/region.js'
import context from '../../src/audio_context.js'


WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

const dummyBuffer = context.createBuffer(2, 44100, 44100)
const reg = Region.fromBuffer(dummyBuffer)
for (var chan = 0; chan < 2; chan++) {
  const samps = dummyBuffer.getChannelData(chan)
  for (var i = 0; i < 44100; i++) {
    samps[i] = Math.random() * 2 - 1
  }
}

describe('state machine operation', () => {
  var player

  beforeEach(() => {
    player = Player(context, reg.buffer)
  })

  it('starts fresh', () => {
    expect(player.initialized).toBe(false)
    expect(player.playing).toBe(false)
  })

  it('moves from fresh to initialized', () => {
    player = player.initialize()
    expect(player.initialized).toBe(true)
    expect(player.playing).toBe(false)
  })

  it('moves from initialized to playing', () => {
    player = player.initialize().play()
    expect(player.initialized).toBe(true)
    expect(player.playing).toBe(true)
  })

  it('moves from playing to initialized', () => {
    player = player.initialize().play().stop()
    expect(player.initialized).toBe(true)
    expect(player.playing).toBe(false)
  })

  it('cannot move from fresh to playing', () => {
    expect(() => player.play()).toThrow()
  })

  it('cannot stop when fresh', () => {
    expect(() => player.stop()).toThrow()
  })

  it('cannot stop when initialized', () => {
    player = player.initialize()
    expect(() => player.stop()).toThrow()
  })

  it('cannot play when playing', () => {
    player = player.initialize().play()
    expect(() => player.play()).toThrow()
  })

  it('cannot initialize when playing', () => {
    player = player.initialize().play()
    expect(() => player.initialize()).toThrow()
  })
})
