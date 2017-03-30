import 'web-audio-test-api'
import Chain from '../../src/audio_managers/audio_chain.js'
import context from '../../src/audio_context.js'

WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

const dummyBuffer = context.createBuffer(2, 11025, 44100)
for (var chan = 0; chan < 2; chan++) {
  const samps = dummyBuffer.getChannelData(chan)
  for (var i = 0; i < 44100; i++) {
    samps[i] = Math.random() * 2 - 1
  }
}

describe('playing', () => {
  beforeEach(() => context.$reset())

  it('can be stopped', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play()
    expect(chain.stop.bind(chain)).not.toThrow()
  })

  it('resets to unscheduled on stop', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play()
    chain.stop()
    expect(chain.playerNode.$state).toBe('UNSCHEDULED')
  })

  it('can be scheduled', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play(2000)
    expect(chain.playerNode.$state).toBe('SCHEDULED')
  })

  it('moves to UNSCHEDULED when it finisheds playing', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play()
    context.$processTo('00:02.000')
    expect(chain.playerNode.$state).toBe('UNSCHEDULED')
  })

  it('can be restarted immediately after stopping', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play()
    expect(chain.stop.bind(chain)).not.toThrow()
    expect(chain.play.bind(chain)).not.toThrow()
  })

  it('can be reinitialized and played after stopping', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.play()
    chain.stop()
    chain.initialize(dummyBuffer)
    expect(chain.play.bind(chain)).not.toThrow()
  })

  it('uses existing buffer if initialized without buffer', () => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.initialize()
    expect(chain.buffer).toBe(dummyBuffer)
  })

  it('can have a callback registered that accepts itself', done => {
    const chain = Chain(context)
    chain.initialize(dummyBuffer)
    chain.onEnd(c => {
      expect(c).toBe(chain)
      expect(c.setBuffer(dummyBuffer).play.bind(c)).not.toThrow()
      done()
    })
    chain.play()
    context.$processTo('00:00.500')
  })
})
