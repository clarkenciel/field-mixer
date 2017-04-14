'use strict'

let ctx
if ('webkitAudioContext' in window) {
  ctx = new webkitAudioContext()
}
else {
  ctx = new AudioContext()
}

export default ctx
