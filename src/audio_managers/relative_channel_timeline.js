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
  }
  const start = this.getStartTimeAt(idx)
  const end = start + region.lengthMillis()
  this._onsets = this._scheduledRegions.slice(0, idx - 1).
    concat(ScheduledRegion(start, end, region)).
    concat(this._scheduledRegions.slice(idx))
  return this
}

// TODO; finish
RelativeTimeline.removeAt = function(idx) {
  const removed = this._scheduledRegions[idx]
  if (removed) {
    this._scheduledRegions.map((sr, idx) => {
      if (idx > idx) {
        sr.start = sr.start - removed.re
      }
      else {
        return sr
      }
    })
  }
  this._scheduledRegions = this._scheduledRegions.slice(0, idx).
    concat(this._scheduledRegions.slice(idx + 1))
  return this
}

RelativeTimeline.acceptsAt = function(idx, region) {
}

RelativeTimeline.acceptsRemovalAt = function(idx) {
}

RelativeTimeline.getStartTimeAt = function(idx) {
  const prior = this._scheduledRegions[idx-1]
  if (prior) {
    return prior.end
  }
  else {
    return 0
  }
}

export default (context) => {
  const out = Object.create(RelativeTimeline)
  out.context = context
  return out
}
