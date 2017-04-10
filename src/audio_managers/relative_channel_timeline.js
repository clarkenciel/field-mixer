'use strict'

import Timeline from './channel_timeline.js'
import ScheduledRegion from './scheduled_region.js'

/* Timeline that inserts regions relative to
 * pre-existing regions so regions are always
 * adjacent:
 * tl = [{ time: 0, length: 2 millis }]
 * tl.insertAt(0, { length: 3 millis })
 * tl -> [{ time: 0, length: 3 millis },
 *        { time: 3, length: 2 millis }]
 * tl.insertAt(1, { length: 4 millis })
 * tl -> [{ time: 0, length: 3 millis },
 *        { time: 3, length: 4 millis },
 *        { time: 7, length: 2 millis }]
 * tl.removeAt(1)
 * tl -> [{ time: 0, length: 3 millis },
 *        { time: 3, length: 2 millis }]
 */

const RelativeTimeline = Timeline(null)

RelativeTimeline.insertAt = function(idx, region) {
  const existing = this._scheduledRegions[idx]
  if (existing) {
    const existingNewStart = existing.start + region.lengthMillis()
    existing.start = existingNewStart
    existing.end = existing.start + existing.region.lengthMillis()
  }
  const start = this.getStartTimeAt(idx)
  const end = start + region.lengthMillis()
  this._scheduledRegions = this._scheduledRegions.slice(0, idx).
    concat(ScheduledRegion(start, end, region)).
    concat(this._scheduledRegions.slice(idx))
  return this
}

RelativeTimeline.appendRegion = function(region) {
  return this.insertAt(this._scheduledRegions.length, region)
}

RelativeTimeline.prependRegion = function(region) {
  return this.insertAt(0, region)
}

// TODO: fix so that removing from head adjusts play times
RelativeTimeline.removeAt = function(idx) {
  this.removeRegion(idx)
  this.removePlayer(idx)
  this.adjustTimes()
  return this
}

RelativeTimeline.removeRegion = function(idx) {
  this.removeFromCollection('_scheduledRegions', idx)
  return this
}

RelativeTimeline.removePlayer = function(idx) {
  this.removeFromCollection('_players', idx)
  return this
}

RelativeTimeline.removeFromCollection = function(name, idx) {
  const removed = this[name][idx]
  const collection = this[name]
  if (removed) {
    collection.forEach((sr, idx2) => {
      if (idx2 > idx) {
        sr.start = sr.start - removed.end
        sr.end = sr.end - removed.end
      }
    })
  }
  this[name] = collection.slice(0, idx).concat(collection.slice(idx + 1))
  return this
}

// TODO: build out so that scheduled regions don't have gaps
RelativeTimeline.adjustTimes = function() {
  if (this._scheduledRegions.length > 0) {
    if (this._scheduledRegions[0].start === 0)
      return this
    else {
      const first = this._scheduledRegions[0].start
      this._scheduledRegions = this._scheduledRegions
        .map(sr => {
          sr.start = sr.start - first
          sr.end = sr.end - first
        })
      return this
    }
  }
}

RelativeTimeline.popRegion = function() {
  const out = this._scheduledRegions.pop()
  return out
}

RelativeTimeline.shiftRegion = function() {
  const out = this._scheduledRegions.shift()
  return out
}

RelativeTimeline.acceptsAt = function(idx, region) {
  return true
}

RelativeTimeline.acceptsRemovalAt = function(idx) {
  return idx >= 0 && idx < this._scheduledRegions.length
}

RelativeTimeline.getStartTimeAt = function(idx) {
  const prior = this._scheduledRegions[idx-1]
  if (prior) {
    return prior.end
  }
  else if (idx > this._scheduledRegions.length) {
    return this.getStartTimeAt(this._scheduledRegions.length)
  }
  else {
    return 0
  }
}

export default (context) => {
  const out = Object.create(RelativeTimeline)
  out.context = context
  out._players = []
  out._scheduledRegions = []
  return out
}
