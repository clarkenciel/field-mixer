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

  const libraryProps = {
    library: libState.library,
    visible: mixState.timelineSelected,
    onSampleClick: MA.addRegionToSelectedTimeline,
    onCoverClick: LA.hide,
  }

  const mixerProps = {
    timelines: mixState.mixer.timelines(),
    playing: mixState.mixer.playing(),
    timelineInView: mixState.timelineInView,
    onPlay: MA.play,
    onPause: MA.pause,
    onStop: MA.stop,
    onGainChange: MA.setGain,
    onPanChange: MA.setPan,
    onRegionAdd: MA.selectTimelineForAdd,
    onRegionRemove: MA.removeRegion,
    onSetRegionWait: MA.setRegionWait
  }

  return {
    libraryProps,
    mixerProps
  }
}

export default Container.createFunctional(
  AppComponent, getStores, getState
)
