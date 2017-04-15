'use strict'


let ctx
if ('webkitAudioContext' in window) {
  ctx = new webkitAudioContext()
}
else if ('AudioContext' in window) {
  ctx = new AudioContext()
}

export default ctx
