'use strict'

import LibraryStore from '../../src/stores/library_store.js'
import Lac from '../../src/actions/library/creators.js'

describe('LibraryStore', () => {
  let state

  const obj1 = { name: 'hi', buffer: [] }
  const obj2 = { name: 'bye', buffer: [] }

  const dispatch = action =>
    state = LibraryStore.reduce(state, action)

  beforeEach(() => {
    state = LibraryStore.getInitialState()
    dispatch(Lac.addItem(obj1))
  })

  it('inserts contents', () => {
    const startSize = state.library.size()
    dispatch(Lac.addItem(obj2))
    const endSize = state.library.size()
    expect(endSize).toBeGreaterThan(startSize)
    expect(state.library.item(0)).toBe(obj1)
    expect(state.library.item(1)).toBe(obj2)
  })
})
