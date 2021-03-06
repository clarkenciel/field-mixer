const MixerActionTypes = {
  APPEND_REGION: 'mixer/append-region',
  PREPEND_REGION: 'mixer/prepend-region',
  INSERT_REGION: 'mixer/insert-region',
  POP_REGION: 'mixer/pop-region',
  SHIFT_REGION: 'mixer/shift-region',
  REMOVE_REGION: 'mixer/remove-region',
  PLAY: 'mixer/play',
  STOP: 'mixer/stop',
  PAUSE: 'mixer/pause',
  RESUME: 'mixer/resume',
  SET_GAIN: 'mixer/set-gain',
  SET_PAN: 'mixer/set-pan',
  ADD_REGION: 'mixer/add-region',
  SELECT_REGION: 'mixer/select-region',
  NEXT_TIMELINE: 'mixer/next-timeline',
  PREV_TIMELINE: 'mixer/prev-timeline',
  SET_REGION_WAIT: 'mixer/set-region-wait'
}

const LibraryActionTypes = {
  ADD_ITEMS: 'library/add-items',
  DISPLAY: 'library/display',
  HIDE: 'library/hide',
  START_LOAD: 'library/start-load',
  FETCH_FILES: 'library/fetch-files'
}

export {
  MixerActionTypes,
  LibraryActionTypes
}
