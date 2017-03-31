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
}

const LibraryActionTypes = {
  ADD_ITEM: 'library/add-item'
}

export {
  MixerActionTypes,
  LibraryActionTypes
}
