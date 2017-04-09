'use strict'

const LibraryTraits = {
  push(item) { return this.items.push(item) },
  size() { return this.items.length },
  item(idx) { return this.items[idx] }
}

export default items => {
  const out = Object.create(LibraryTraits)
  out.items = items || []
  return out
}
