'use strict'

import 'web-audio-test-api'
import MixerStore from '../../src/stores/mixer_store.js'
import Mac from '../../src/actions/mixer/creators.js'
import Region from '../../src/audio_managers/region.js'
import context from '../../src/audio_context.js'

WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
})

describe('MixerStore', () => {
  const dummyBuf1 = context.createBuffer(2, 11025, context.sampleRate) // 0.25 sec
  const dummyBuf2 = context.createBuffer(2, 22050, context.sampleRate) // 0.50 sec
  const dummyBuf3 = context.createBuffer(2, 44100, context.sampleRate) // 1.00 sec
  const dummyBuf4 = context.createBuffer(2, 88200, context.sampleRate) // 2.00 sec
                                                                       // 3.75 sec
  const reg1 = Region.fromBuffer(dummyBuf1)
  const reg2 = Region.fromBuffer(dummyBuf2)
  const reg3 = Region.fromBuffer(dummyBuf3)
  const reg4 = Region.fromBuffer(dummyBuf4)
  const runner = {}

  runner.players = () => runner.state.timelines().
    map((tl, idx) => tl.players().map(p => p.chain.playerNode))

  runner.regions = () => runner.state.timelines().
    map(tl => tl.scheduledRegions().map(sr => sr.region))

  runner.scheduledRegions = () => runner.state.timelines().
    map(tl => tl.scheduledRegions().map(sr => sr))

  runner.dispatch = action => runner.state = MixerStore.reduce(runner.state, action)

  beforeEach(() => {
    runner.state = MixerStore.getInitialState()
  })

  describe('region addition', () => {
    it('appends regions to the correct timeline', () => {
      const startLens = runner.scheduledRegions().
        map(tl => tl.length)
      runner.dispatch(Mac.appendRegion(0, reg1))
      runner.dispatch(Mac.appendRegion(0, reg2))
      const endLens = runner.scheduledRegions().
        map(tl => tl.length)

      expect(endLens[0]).toBeGreaterThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0][0]).toBe(reg1)
    })

    it('prepends regions to the appropriate timeline', () => {
      const startLens = runner.scheduledRegions().map(tl => tl.length)
      runner.dispatch(Mac.prependRegion(0, reg1))
      runner.dispatch(Mac.prependRegion(0, reg2))
      const endLens = runner.scheduledRegions().map(tl => tl.length)

      expect(endLens[0]).toBeGreaterThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0][0]).toBe(reg2)
    })

    it('inserts regions to the appropriate timeline', () => {
      const startLens = runner.scheduledRegions().map(tl => tl.length)
      runner.dispatch(Mac.insertRegion(0, 0, reg1))
      runner.dispatch(Mac.insertRegion(0, 0, reg2))
      runner.dispatch(Mac.insertRegion(0, 1, reg3))
      const endLens = runner.scheduledRegions().map(tl => tl.length)

      expect(endLens[0]).toBeGreaterThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0]).toEqual([reg2,reg3,reg1])
    })
  })

  describe('region removal', () => {
    beforeEach(() => {
      runner.dispatch(Mac.appendRegion(0, reg1))
      runner.dispatch(Mac.appendRegion(0, reg2))
      runner.dispatch(Mac.appendRegion(0, reg3))
    })

    it('pops regions from the appropriate timeline', () => {
      const startLens = runner.scheduledRegions().map(tl => tl.length)
      runner.dispatch(Mac.popRegion(0))
      const endLens = runner.scheduledRegions().map(tl => tl.length)

      expect(endLens[0]).toBeLessThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0]).toEqual([reg1, reg2])
    })

    it('shifts regions from the appropriate timeline', () => {
      const startLens = runner.scheduledRegions().map(tl => tl.length)
      runner.dispatch(Mac.shiftRegion(0))
      const endLens = runner.scheduledRegions().map(tl => tl.length)

      expect(endLens[0]).toBeLessThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0]).toEqual([reg2, reg3])
    })

    it('removes regions at the correct index from the correct timeline', () => {
      const startLens = runner.scheduledRegions().map(tl => tl.length)
      runner.dispatch(Mac.removeRegion(0, 1))
      const endLens = runner.scheduledRegions().map(tl => tl.length)

      expect(endLens[0]).toBeLessThan(startLens[0])
      expect(endLens.slice(1)).toEqual(startLens.slice(1))
      expect(runner.regions()[0]).toEqual([reg1, reg3])
    })
  })

  describe('playback', () => {
    runner.playStatuses = () =>
      runner.players().
        map(playerArr => playerArr.map(node => node.$state))

    beforeEach(() => {
      context.$reset
      runner.state = MixerStore.getInitialState()
      runner.dispatch(Mac.appendRegion(0, reg1))
      runner.dispatch(Mac.appendRegion(0, reg2))

      runner.dispatch(Mac.appendRegion(1, reg1))
      runner.dispatch(Mac.appendRegion(1, reg2))

      runner.dispatch(Mac.appendRegion(2, reg1))
      runner.dispatch(Mac.appendRegion(2, reg2))

      runner.dispatch(Mac.appendRegion(3, reg1))
      runner.dispatch(Mac.appendRegion(3, reg2))
      runner.dispatch(Mac.play())
    })

    it('plays the first region of each track', () => {
      expect(runner.playStatuses().map(tl => tl[0])).toEqual([
        'PLAYING',
        'PLAYING',
        'PLAYING',
        'PLAYING'
      ])
    })

    it('schedules future regions of each track', () => {
      expect(runner.playStatuses().map(tl => tl[1])).toEqual([
        'SCHEDULED',
        'SCHEDULED',
        'SCHEDULED',
        'SCHEDULED'
      ])
    })

    it('stops all regions for each track', () => {
      runner.dispatch(Mac.stop())
      expect(runner.playStatuses().map(tl => tl)).toEqual([
        ['UNSCHEDULED', 'UNSCHEDULED'],
        ['UNSCHEDULED', 'UNSCHEDULED'],
        ['UNSCHEDULED', 'UNSCHEDULED'],
        ['UNSCHEDULED', 'UNSCHEDULED']
      ])
    })

    describe('pausing/resuming', () => {
      it('pauses all players', () => {
        context.$processTo('00:00.010')
        runner.dispatch(Mac.pause())
        expect(runner.playStatuses().map(tl => tl)).toEqual([
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED']
        ])
      })

      it('resumes all players scheduled after the pause point', () => {
        context.$processTo('00:00.300')
        expect(runner.playStatuses().map(tl => tl)).toEqual([
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING']
        ])

        runner.dispatch(Mac.pause())

        expect(runner.playStatuses().map(tl => tl)).toEqual([
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED']
        ])

        context.$processTo('00:02.000')

        expect(runner.playStatuses().map(tl => tl)).toEqual([
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED'],
          ['UNSCHEDULED', 'UNSCHEDULED']
        ])

        console.log('final test')
        runner.dispatch(Mac.resume())
        context.$processTo('00:02.250')
        expect(runner.playStatuses().map(tl => tl)).toEqual([
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING'],
          ['UNSCHEDULED', 'PLAYING']
        ])
      })
    })
  })
})
