'use strict'


let ctx
if ('AudioContext' in window) {
  ctx = new AudioContext()
}
else if ('webkitAudioContext' in window) {
  ctx = new webkitAudioContext()
}

export default ctx
