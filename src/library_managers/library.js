'use strict'

const LibraryTraits = {
  push(item) { return this.items.push(item) },
  size() { return this.items.length },
  item(idx) { return this.items[idx] }
}

export default () => {
  const out = Object.create(LibraryTraits)
  out.items = []
  return out
}
