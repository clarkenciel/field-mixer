'use strict'

import 'web-audio-test-api'
import Mixer from '../../src/audio_managers/mixer.js'
import Region from '../../src/audio_managers/region.js'
import RelativeTimeline from '../../src/audio_managers/relative_channel_timeline.js'
import context from '../../src/audio_context.js'


WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

const dummyBuffer = context.createBuffer(2, 88200, 44100)
for (let chan = 0; chan < 2; chan++) {
  const samps = dummyBuffer.getChannelData(chan)
  for (let i = 0; i < 44100; i++) {
    samps[i] = Math.random() * 2 - 1
  }
}

const [reg1, reg2, reg3] = Array(3).fill(null).map(_ => Region.fromBuffer(dummyBuffer))

describe('timeline management', () => {
  let mixer
  beforeEach(() => {
    mixer = Mixer(context)
  })

  describe('timeline addition', () => {
    it('appends', () => {
      const startLen = mixer.size()
      const tl1 = mixer.appendTimeline(RelativeTimeline)
      const tl2 = mixer.appendTimeline(RelativeTimeline)
      const endLen = mixer.size()

      expect(endLen).toBeGreaterThan(startLen)
      expect(endLen).toEqual(2)
      expect(mixer.timeline(0)).toBe(tl1)
      expect(mixer.timeline(1)).toBe(tl2)
    })

    it('prepends', () => {
      const startLen = mixer.size()
      const tl1 = mixer.prependTimeline(RelativeTimeline)
      const tl2 = mixer.prependTimeline(RelativeTimeline)
      const endLen = mixer.size()

      expect(endLen).toBeGreaterThan(startLen)
      expect(endLen).toEqual(2)
      expect(mixer.timeline(1)).toBe(tl1)
      expect(mixer.timeline(0)).toBe(tl2)
    })

    describe('insertion', () => {
      let startLen, endLen, tl1, tl2, tl3
      beforeEach(() => {
        tl1 = mixer.appendTimeline(RelativeTimeline)
        tl2 = mixer.appendTimeline(RelativeTimeline)
        startLen = mixer.size()
      })

      it('increases the size of the mixer', () => {
        mixer.insertTimeline(0, RelativeTimeline)
        expect(mixer.size()).toBeGreaterThan(startLen)
      })

      it('shifts following elements right', () => {
        const tl3 = mixer.insertTimeline(0, RelativeTimeline)
        endLen = mixer.size()
        expect(startLen).toBeLessThan(endLen)
        expect(mixer.timeline(0)).toBe(tl3)
        expect(mixer.timeline(1)).toBe(tl1)
        expect(mixer.timeline(2)).toBe(tl2)
      })

      it('inserts at tail if index is too high', () => {
        const tl3 = mixer.insertTimeline(2, RelativeTimeline)
        endLen = mixer.size()
        expect(startLen).toBeLessThan(endLen)
        expect(mixer.timeline(0)).toBe(tl1)
        expect(mixer.timeline(1)).toBe(tl2)
        expect(mixer.timeline(2)).toBe(tl3)
      })

      it('inserts at head if index is too low', () => {
        const tl3 = mixer.insertTimeline(-1, RelativeTimeline)
        endLen = mixer.size()
        expect(mixer.timeline(0)).toBe(tl3)
        expect(mixer.timeline(1)).toBe(tl1)
        expect(mixer.timeline(2)).toBe(tl2)
      })
    })
  })

  describe('timeline removal', () => {
    var startLen, endLen, tl1, tl2, tl3
    beforeEach(() => {
      tl1 = mixer.appendTimeline(RelativeTimeline)
      tl2 = mixer.appendTimeline(RelativeTimeline)
      startLen = mixer.size()
    })

    describe('popping', () => {
      beforeEach(() => {
        tl3 = mixer.popTimeline()
      })

      it('reduces the size of the mixer', () => {
        endLen = mixer.size()
        expect(endLen).toBeLessThan(startLen)
      })

      it('returns the last timeline in the mixer', () => {
        expect(tl3).toBe(tl2)
      })

      it('leaves the preceding elements untouched', () => {
        expect(mixer.timeline(0)).toBe(tl1)
      })
    })

    describe('shifting', () => {
      beforeEach(() => {
        tl3 = mixer.shiftTimeline()
      })

      it('reduces the size of the mixer', () => {
        endLen = mixer.size()
        expect(endLen).toBeLessThan(startLen)
      })

      it('returns the first timeline in the mixer', () => {
        expect(tl3).toBe(tl1)
      })

      it('leaves the following elements untouched', () => {
        expect(mixer.timeline(0)).toBe(tl2)
      })
    })

    describe('removal at index', () => {
      let tl4
      beforeEach(() => {
        tl4 = mixer.appendTimeline(RelativeTimeline)
        startLen = mixer.size()
        tl3 = mixer.removeTimelineAt(1)
      })

      it('reduces the size of the mixer', () => {
        endLen = mixer.size()
        expect(endLen).toBeLessThan(startLen)
      })

      it('returns the last timeline in the mixer', () => {
        expect(tl3).toBe(tl2)
      })

      it('leaves the surrounding timelines untouched', () => {
        expect(mixer.timeline(0)).toBe(tl1)
        expect(mixer.timeline(1)).toBe(tl4)
      })
    })
  })
})

describe('playback', () => {
  let mixer, tl1, tl2

  const players = () =>
    mixer.timelines().map(tl => tl.players())

  const playerStatuses = () =>
    players().map(playerArray =>
      playerArray.map(player => player.chain.playerNode.$state))

  beforeEach(() => {
    context.$reset
    mixer = Mixer(context)
    tl1 = mixer.appendTimeline(RelativeTimeline)
    tl2 = mixer.appendTimeline(RelativeTimeline)
    tl1.appendRegion(reg1)
    tl1.appendRegion(reg2)
    tl2.appendRegion(reg1)
    tl2.appendRegion(reg2)

    mixer.play()
  })

  it('schedules all timelines', () => {
    expect(playerStatuses()).toEqual([
      ['PLAYING','SCHEDULED'],
      ['PLAYING','SCHEDULED']
    ])
  })

  it('plays through timelines', () => {
    context.$processTo('00:02.000')
    expect(playerStatuses()).toEqual([
      ['UNSCHEDULED','PLAYING'],
      ['UNSCHEDULED','PLAYING']
    ])
  })

  it('stops all timelines', () => {
    mixer.stop()
    expect(playerStatuses()).toEqual([
      ['UNSCHEDULED','UNSCHEDULED'],
      ['UNSCHEDULED','UNSCHEDULED']
    ])
  })

  describe('pausing/resuming', () => {
    beforeEach(() => {
      context.$processTo('00:01.000')
      mixer.pause(1000)
    })

    it('pauses all timelines', () => {
      expect(playerStatuses()).toEqual([
        ['UNSCHEDULED','UNSCHEDULED'],
        ['UNSCHEDULED','UNSCHEDULED']
      ])
    })

    it('resumes all timelines', () => {
      mixer.resume()
      expect(playerStatuses()).toEqual([
        ['UNSCHEDULED','SCHEDULED'],
        ['UNSCHEDULED','SCHEDULED']
      ])
      context.$processTo('00:03.000')
      expect(playerStatuses()).toEqual([
        ['UNSCHEDULED','PLAYING'],
        ['UNSCHEDULED','PLAYING']
      ])
    })
  })
})
