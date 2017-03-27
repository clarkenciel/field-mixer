import Region from '../../src/audio_managers/region.js'
import 'web-audio-test-api'

WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})
const context = new AudioContext()
const dummyBuffer = context.createBuffer(2, 44100, 44100)

describe('basic properties', () => {
  var reg
  beforeEach(() => {
    reg = Region.fromBuffer(dummyBuffer)
  })

  it('holds a reference to the initial audio buffer', () => {
    expect(reg.buffer).toBe(dummyBuffer)
  })

  it('can return length in seconds', () => {
    expect(reg.lengthSeconds()).toEqual(1)
  })

  it('can return length in millis', () => {
    expect(reg.lengthMillis()).toEqual(1000)
  })

  it('can return end time in seconds', () => {
    expect(reg.endSeconds()).toEqual(1)
  })

  it('can return end time in millis', () => {
    expect(reg.endMillis()).toEqual(1000)
  })
})

describe('offsets', () => {
  var reg, off
  beforeEach(() => {
    reg = Region.fromBuffer(dummyBuffer)
    off = reg.offset(10)
  })

  it('returns a new object with the offset', () => {
    expect(reg).not.toBe(off)
  })

  it('offsets the start time', () => {
    expect(off.startTime).toEqual(10)
    expect(off.startTime).toBeGreaterThan(reg.startTime)
  })

  it('offsets the end time', () => {
    expect(off.endSeconds()).toBeGreaterThan(reg.endSeconds())
    expect(off.endMillis()).toBeGreaterThan(reg.endMillis())
  })

  it('maintains length regardless of offset', () => {
    expect(off.lengthMillis()).toEqual(reg.lengthMillis())
    expect(off.lengthSeconds()).toEqual(reg.lengthSeconds())
  })
})
