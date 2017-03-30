'use strict'

import ScheduledRegion from '../../src/audio_managers/scheduled_region.js'
import Region from '../../src/audio_managers/region.js'

describe('properties', () => {
  var reg, sreg
  beforeEach(() => {
    reg = Region.fromBuffer({ buffer: [], length: 0, duration: 0 })
    sreg = ScheduledRegion(0, 10, reg)
  })

  it('has a start', () => {
    expect(sreg.start).toEqual(0)
  })

  it('has an end', () => {
    expect(sreg.end).toEqual(10)
  })

  it('has a region', () => {
    expect(sreg.region).toBe(reg)
  })
})

describe('comparison', () => {
  var reg1, reg2, reg3, reg4, reg5
  beforeEach(() => {
    reg1 = ScheduledRegion(2, 8, null)
    reg2 = ScheduledRegion(5, 15, null)
    reg3 = ScheduledRegion(0, 5, null)
    reg4 = ScheduledRegion(0, 10, null)
    reg5 = ScheduledRegion(20, 30, null)
  })

  it('detects within', () => {
    expect(reg1.isWithin(reg4)).toBe(true)
    expect(reg3.isWithin(reg4)).toBe(true)
  })

  it('detects containing', () => {
    expect(reg4.contains(reg1)).toBe(true)
    expect(reg4.contains(reg3)).toBe(true)
  })

  it('detects overlaps on the left', () => {
    expect(reg1.overlapsLeft(reg2)).toBe(true)
  })

  it('detects overlaps on the right', () => {
    expect(reg2.overlapsRight(reg1)).toBe(true)
  })

  it('does not detect false positives', () => {
    [reg1, reg2, reg3, reg4].forEach(reg => {
      expect(reg.isWithin(reg5)).toBe(false)
      expect(reg.contains(reg5)).toBe(false)
      expect(reg.overlapsRight(reg5)).toBe(false)
      expect(reg.overlapsLeft(reg5)).toBe(false)
    })
    expect(reg3.overlapsLeft(reg2)).toBe(false)
  })
})
