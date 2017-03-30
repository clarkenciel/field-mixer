import 'web-audio-test-api'
import Timeline from '../../src/audio_managers/relative_channel_timeline.js'
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
    expect(tl.acceptsRegionAt(10, reg)).toBe(true)
    tl.insertAt(10, reg)
    expect(tl.acceptsRegionAt(0, reg)).toBe(true)
    expect(tl.acceptsRegionAt(12, reg)).toBe(true)
  })

  it('does not accept region overlaps', () => {
    tl.insertAt(10, reg)
    expect(tl.acceptsRegionAt(10, reg)).toBe(false)
    expect(tl.acceptsRegionAt(9, reg)).toBe(false)
    expect(tl.acceptsRegionAt(11, reg)).toBe(false)
  })

  it('accepts removal of region given any pos within region dur', () => {
    tl.insertAt(0, reg)
    expect(tl.acceptsRemovalAt(0)).toBe(true)
    expect(tl.acceptsRemovalAt(1)).toBe(true)
  })

  it('rejects removal if there is no region at time', () => {
    tl.insertAt(0, reg)
    expect(tl.acceptsRemovalAt(2)).toBe(false)
  })

  it('stores regions with onset times', () => {
    tl.insertAt(0, reg)
    expect(tl.scheduledRegions()[0].start).toEqual(0)
    expect(tl.scheduledRegions()[0].region).toBe(reg)
  })

  it('inserts regions in appropriate order', () => {
    const startLen = tl.scheduledRegions().length
    tl.insertAt(4, reg2)
    tl.insertAt(0, reg)
    tl.insertAt(10, reg)
    expect(tl.scheduledRegions().length).toBeGreaterThan(startLen)
    expect(tl.scheduledRegions().length).toEqual(3)
    expect(tl.scheduledRegions()[0].start).toEqual(0)
    expect(tl.scheduledRegions()[1].start).toEqual(4)
    expect(tl.scheduledRegions()[2].start).toEqual(10)
  })

  it('does not move other regions on insertion', () => {
    tl.insertAt(4, reg2)
    tl.insertAt(0, reg)
    expect(tl.scheduledRegions()[1].start).toEqual(4)
    expect(tl.scheduledRegions()[1].region).toBe(reg2)
  })

  it('moves remaining onset indices left on removal', () => {
    tl.insertAt(0, reg)
    tl.insertAt(4, reg2)
    const startLen = tl.scheduledRegions().length
    tl.removeAt(1)
    expect(tl.scheduledRegions().length).toBeLessThan(startLne)
    expect(tl.scheduledRegions().length).toEqual(1)
    expect(tl.scheduledRegions()[0].region).toBe(reg2)
  })

  it('does not move other regions onsets on removal', () => {
    tl.insertAt(0, reg)
    tl.insertAt(4, reg2)
    tl.removeAt(1)
    expect(tl.scheduledRegions()[0].start).toEqual(4)
  })
})
