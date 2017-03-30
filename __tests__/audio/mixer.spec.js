import 'web-audio-test-api'
import Mixer from '../../src/audio_managers/mixer.js'
import Region from '../../src/audio_managers/region.js'

WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

const context = new AudioContext()
const dummyBuffer = context.createBuffer(2, 88200, 44100)
for (var chan = 0; chan < 2; chan++) {
  const samps = dummyBuffer.getChannelData(chan)
  for (var i = 0; i < 44100; i++) {
    samps[i] = Math.random() * 2 - 1
  }
}

describe('region adding', () => {
  it('adds regions to appropriate timeline', () => {
  })
})

describe('region deletion', () => {
  it('only removes regions from specified timeline', () => {
  })
})

describe('playback', () => {
  it('schedules all timelines', () => {
  })
})
