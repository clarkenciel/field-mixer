import 'web-audio-test-api'
import Timeline from '../../src/audio_managers/channel_timeline.js'
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

describe('adding and removing regions', () => {
  var tl, reg, reg2
  beforeEach(() => {
    tl = Timeline(context)
    reg = Region.fromBuffer(dummyBuffer)
    reg2 = Region.fromBuffer(dummyBuffer)
  })

  it('accepts regions with millis timestamps', () => {
    expect(tl.acceptsRegion(10, reg)).toBe(true)
    tl.insertRegion(10, reg)
    expect(tl.acceptsRegion(0, reg)).toBe(true)
    expect(tl.acceptsRegion(12, reg)).toBe(true)
  })

  it('does not accept region overlaps', () => {
    tl.insertRegion(10, reg)
    expect(tl.acceptsRegion(10, reg)).toBe(false)
    expect(tl.acceptsRegion(9, reg)).toBe(false)
    expect(tl.acceptsRegion(11, reg)).toBe(false)
  })

  it('accepts removal of region given any pos within region dur', () => {
    tl.insertRegion(0, reg)
    expect(tl.acceptsRemoval(0)).toBe(true)
    expect(tl.acceptsRemoval(1)).toBe(true)
  })

  it('rejects removal if there is no region at time', () => {
    tl.insertRegion(0, reg)
    expect(tl.acceptsRemoval(2)).toBe(false)
  })

  it('stores regions with onset times', () => {
    tl.insertRegion(0, reg)
    expect(tl.onsets[0].time).toEqual(0)
    expect(tl.onsets[0].region).toBe(reg)
  })

  it('inserts regions in appropriate order', () => {
    const startLen = tl.onsets.length
    tl.insertRegion(4, reg2)
    tl.insertRegion(0, reg)
    tl.insertRegion(10, reg)
    expect(tl.onsets.length).toBeGreaterThan(startLen)
    expect(tl.onsets.length).toEqual(3)
    expect(tl.onsets[0].time).toEqual(0)
    expect(tl.onsets[1].time).toEqual(4)
    expect(tl.onsets[2].time).toEqual(10)
  })

  it('does not move other regions on insertion', () => {
    tl.insertRegion(4, reg2)
    tl.insertRegion(0, reg)
    expect(tl.onsets[1].time).toEqual(4)
    expect(tl.onsets[1].region).toBe(reg2)
  })

  it('moves remaining onsets left on removal', () => {
    tl.insertRegion(0, reg)
    tl.insertRegion(4, reg2)
    const startLen = tl.onsets.length
    tl.removeAt(1)
    expect(tl.onsets.length).toBeLessThan(startLne)
    expect(tl.onsets.length).toEqual(1)
    expect(tl.onsets[0].region).toBe(reg2)
  })

  it('does not move other regions onsets on removal', () => {
    tl.insertRegion(0, reg)
    tl.insertRegion(4, reg2)
    tl.removeAt(1)
    expect(tl.onsets[0].time).toEqual(4)
  })
})

describe('playback', () => {

  var tl, reg, reg2
  beforeEach(() => {
    context.$reset()
    tl = Timeline(context)
    reg = Region.fromBuffer(dummyBuffer)
    reg2 = Region.fromBuffer(dummyBuffer)
  })

  it('schedules all players on play', () => {
    tl.insertRegion(0, reg)
    tl.insertRegion(2, reg)
    tl.play()
    expect(tl.players[0].$state).toBe('FINISHED')
    expect(tl.players[1].$state).toBe('FINISHED')
  })

  it('stops all players on stop', () => {
    tl.insertRegion(0, reg)
    tl.insertRegion(2, reg)
    tl.play()
    tl.stop()
    expect(tl.players[0].$state).toBe('FINISHED')
    expect(tl.players[1].$state).toBe('FINISHED')
  })

  describe('pausing', () => {
    beforeEach(() => {
      tl.insertRegion(0, reg)
      tl.insertRegion(4, reg)
      tl.play()
      context.$processTo('00:02.000')
    })

    it('plays through one at a time', () => {
      expect(tl.players[0].$state).toBe('FINISHED')
      expect(tl.players[1].$state).toBe('PLAYING')
    })

    it('stops all players and remembers time on pause', () => {
      tl.pause()
      expect(tl.location).toEqual(2000)
      expect(tl.players[0].$state).toBe('FINISHED')
      expect(tl.players[1].$state).toBe('FINISHED')
    })

    it('schedules all players after pause time on resume', () => {
      tl.resume()
      expect(tl.players[0].$state).toBe('FINISHED')
      expect(tl.players[1].$state).toBe('PLAYING')
      context.$processTo('00:04.000')
      expect(tl.players[1].$state).toBe('FINISHED')
    })
  })

  it('accepts callbacks for onsets that accept the onset pair', () => {
    tl.onOnset(0, ({ time, region }) => {})
    expect(tl.onsets[0].startCallback).not.toBe(null)
  })

  it('fires callbacks on beginning of onsets', done => {
    const onsetOne = 0
    const onsetTwo = 2
    tl.insertRegion(onsetOne, reg)
    tl.insertRegion(onsetTwo, reg2)
    tl.onOnset(onsetOne, ({ currentTime, region }) => {
      expect(currentTime).toEqual(onsetOne)
      expect(region).toBe(reg)
    })
    tl.onOnset(onsetTwo, ({ currentTime, region }) => {
      expect(currentTime).toEqual(onsetTwo)
      expect(region).toBe(reg2)
      done()
    })
    tl.play()
    context.$processTo('00:05.000')
  })

  it('accepts callbacks for region endings', () => {
    tl.onRegionEnd(0, ({ region }) => {})
    expect(tl.onsets[0].endCallback).not.toBe(null)
  })

  it('fires callbacks on endings of regions', done => {
    const onsetOne = 0
    const onsetTwo = 2
    tl.insertRegion(onsetOne, reg)
    tl.insertRegion(onsetTwo, reg2)
    tl.onOnset(onsetOne, ({ currentTime, region }) => {
      expect(currentTime).toEqual(onsetOne + reg.lengthMillis())
      expect(region).toBe(reg)
    })
    tl.onOnset(onsetTwo, ({ currentTime, region }) => {
      expect(currentTime).toEqual(onsetTwo + reg2.lengthMillis())
      expect(region).toBe(reg2)
      done()
    })
    tl.play()
    context.$processTo('00:05.000')
  })
})
