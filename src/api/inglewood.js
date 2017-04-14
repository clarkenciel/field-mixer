'use strict'

import { Promise } from 'bluebird'
import La from '../actions/library/dispatchers.js'
import ctx from '../audio_context.js'

const host = 'https://mbalvanera.github.io/wouldinglewood.github.io/audio/'

export default {
  getFile(filename) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest

      request.open('GET', host+filename, true)
      request.responseType = 'arraybuffer'

      request.onload = () => {
        const audioData = request.response
        ctx.decodeAudioData(
          audioData,
          buffer => resolve(buffer),
          x => {
            console.log('FETCH ERROR [' + filename + ']: ', x)
            reject(x)
          }
        )
      }

      request.send()
    })
  }
}
