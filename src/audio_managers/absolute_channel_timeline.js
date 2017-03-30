'use strict'

import TimelineData from './channel_timeline.js'
import ScheduledRegion from './scheduled_region.js'

/* Timeline that inserts regions at absolute
 * time offsets (in millis)
 * tl = []
 * tl.insertAt(10, { length: 3 millis })
 * tl -> [{ time: 10, length: 3 millis }]
 * tl.insertAt(0, { length: 2 millis })
 * tl -> [{ time: 0, length: 2 millis },
 *        { time: 10, length: 2 millis }]
 * tl.removeAt(10)
 * tl -> [{ time: 0, length: 2 millis }]
 */

const AbsoluteTimeline = Object.create(TimelineData)

AbsoluteTimeline.insertAt = function(time, region) {
  if (this.acceptsAt(time, region)) {
  }
  else {
    const m = 'Tried to insert overlapping region'
    throw(Error(m))
  }
}

AbsoluteTimeline.removeAt = function(time) {
}

AbsoluteTimeline.acceptsAt = function(time, region) {
  const check = ScheduledRegion(time, time + region.lengthMillis())
  const overlap = this.onsets().find(onset =>
    check.overlapsLeft(onset) ||
    check.isWithin(onset) ||
    check.contains(onset) ||
    check.overlapsRight(onset)
  )
  return Boolean(overlap)
}

AbsoluteTimeline.acceptsRemovalAt = function(time) {
}

export default (context) => {
  const out = Object.create(AbsoluteTimeline)
  out.context = context
  return out
}
