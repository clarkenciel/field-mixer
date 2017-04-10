'use strict'

import { Container } from 'flux/utils'
import AppComponent from '../components/app.jsx'
import LibStore from '../stores/library_store.js'
import MixStore from '../stores/mixer_store.js'
import MA from '../actions/mixer/dispatchers.js'
import LA from '../actions/library/dispatchers.js'

const getStores = () => [
  LibStore, MixStore
]

const getState = () => {
  const libState = LibStore.getState()
  const mixState = MixStore.getState()

  // TODO: i feel there is definitely a better way to handle this.
  if (mixState.timelineSelected) {
    LA.display()
  }

  const dh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  const dw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )

  const libraryProps = {
    items: libState.library.items,
    loading: libState.library.loadingItems,
    visible: libState.visible,
    onSampleClick: MA.addRegionToSelectedTimeline,
    onCoverClick: LA.hide,
  }

  const mixerProps = {
    timelines: mixState.mixer.timelines(),
    playing: mixState.mixer.playing(),
    onPlay: MA.play,
    onPause: MA.pause,
    onStop: MA.stop,
    onGainChange: MA.setGain,
    onPanChange: MA.setPan,
    onRegionAdd: MA.selectTimelineForAdd,
    onRegionRemove: MA.removeRegion
  }

  return {
    dh, dw,
    libraryProps,
    mixerProps
  }
}

export default Container.createFunctional(
  AppComponent, getStores, getState
)
