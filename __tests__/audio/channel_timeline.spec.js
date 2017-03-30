jest.useFakeTimers()

import 'web-audio-test-api'
import Timeline from '../../src/audio_managers/channel_timeline.js'
import Region from '../../src/audio_managers/region.js'
import ScheduledRegion from '../../src/audio_managers/scheduled_region.js'
import context from '../../src/audio_context.js'


WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

const dummyBuffer = context.createBuffer(2, context.sampleRate * 2, context.sampleRate)
for (var chan = 0; chan < 2; chan++) {
  const samps = dummyBuffer.getChannelData(chan)
  for (var i = 0; i < 44100; i++) {
    samps[i] = Math.random() * 2 - 1
  }
}

describe('playback', () => {

  var tl, reg, reg2
  beforeEach(() => {
    context.$reset()
    tl = Timeline(context)
    reg = Region.fromBuffer(dummyBuffer)
    reg2 = Region.fromBuffer(dummyBuffer)
    const len1 = reg.lengthMillis()
    reg = ScheduledRegion(0, reg.lengthMillis(), reg)
    reg2 = ScheduledRegion(len1, len1 + reg2.lengthMillis(), reg2)
  })

  it('schedules all players on play', () => {
    tl.scheduledRegions().push(reg)
    tl.scheduledRegions().push(reg2)
    tl.play()
    expect(tl.players()[0].chain.playerNode.$state).toBe('PLAYING')
    expect(tl.players()[1].chain.playerNode.$state).toBe('SCHEDULED')
  })

  it('stops all players on stop', () => {
    tl.scheduledRegions().push(reg)
    tl.scheduledRegions().push(reg2)
    tl.play()
    tl.stop()
    expect(tl.players()[0].chain.playerNode.$state).toBe('UNSCHEDULED')
    expect(tl.players()[1].chain.playerNode.$state).toBe('UNSCHEDULED')
  })

  describe('callbacks', () => {
    var tl, reg, reg2
    const shortBuffer = context.createBuffer(2, context.sampleRate * 0.01, context.sampleRate)
    for (var chan = 0; chan < 2; chan++) {
      const samps = dummyBuffer.getChannelData(chan)
      for (var i = 0; i < 44100; i++) {
        samps[i] = Math.random() * 2 - 1
      }
    }

    beforeEach(() => {
      context.$reset()
      tl = Timeline(context)
      reg = Region.fromBuffer(shortBuffer)
      reg2 = Region.fromBuffer(shortBuffer)
      const len1 = reg.lengthMillis()

      reg = ScheduledRegion(0, reg.lengthMillis(), reg)
      reg2 = ScheduledRegion(len1, len1 + reg2.lengthMillis(), reg2)
      tl.scheduledRegions().push(reg)
      tl.scheduledRegions().push(reg2)
    })

    it('accepts callbacks for onsets that accept the onset pair', () => {
      tl.onOnset(0, ({ time, region }) => {})
      expect(tl.scheduledRegions()[0].onstart).not.toBe(null)
    })

    it('fires callbacks on beginning of onsets', done => {
      const onsetOne = 0
      const onsetTwo = 1
      tl.onOnset(onsetOne, ({ currentTime, region }) => {
        expect(region).toBe(reg)
        expect(currentTime).toEqual(reg.start)
      })
      tl.onOnset(onsetTwo, ({ currentTime, region }) => {
        expect(region).toBe(reg2)
        expect(currentTime).toEqual(reg2.start)
        done()
      })
      tl.play()
      jest.runTimersToTime(0)
      context.$processTo('00:00.010')
      jest.runOnlyPendingTimers()
      // jest.runTimersToTime(300)
    })

    it('accepts callbacks for region endings', () => {
      tl.onRegionEnd(0, ({ currentTime, region }) => {})
      expect(tl.scheduledRegions()[0].onend).not.toBe(null)
    })

    it('fires callbacks on endings of regions', done => {
      const onsetOne = 0
      const onsetTwo = 1
      tl.onRegionEnd(onsetOne, ({ currentTime, region }) => {
        expect(currentTime).toEqual(reg.end)
        expect(region).toBe(reg)
      })
      tl.onRegionEnd(onsetTwo, ({ currentTime, region }) => {
        expect(region).toBe(reg2)
        expect(currentTime).toEqual(reg2.end)
        done()
      })
      tl.play()
      context.$processTo('00:00.300')
    })
  })

  describe('pausing', () => {
    beforeEach(() => {
      tl.scheduledRegions().push(reg)
      tl.scheduledRegions().push(reg2)
      tl.play()
      context.$processTo('00:02.000')
    })

    it('plays through one at a time', () => {
      expect(tl.players()[0].chain.playerNode.$state).toBe('UNSCHEDULED')
      expect(tl.players()[1].chain.playerNode.$state).toBe('PLAYING')
    })

    it('stops all players and remembers time on pause', () => {
      tl.pause(context.currentTime * 1000)
      expect(tl.pausedAt()).toEqual(2000)
      expect(tl.players()[0].chain.playerNode.$state).toBe('UNSCHEDULED')
      expect(tl.players()[1].chain.playerNode.$state).toBe('UNSCHEDULED')
    })

    it('schedules all players after pause time on resume', () => {
      tl.pause(context.currentTime * 1000)
      tl.resume()
      expect(tl.players()[0].chain.playerNode.$state).toBe('UNSCHEDULED')
      expect(tl.players()[1].chain.playerNode.$state).toBe('FINISHED')
      context.$processTo('00:05.000')
      expect(tl.players()[1].chain.playerNode.$state).toBe('UNSCHEDULED')
    })
  })
})
