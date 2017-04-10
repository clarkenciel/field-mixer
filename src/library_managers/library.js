'use strict'

const ItemCollectionTraits = {
  add(item) {
    this.items[item.name] = item
  },

  remove(itemName) {
    delete this.items[itemName]
  },

  map(f) {
    return Object.keys(this.items)
      .map((k, ...rest) => f(this.items[k], ...rest))
  },

  size() { return Object.keys(this.items).length},
  get(name) { return this.items(name) }
}

const ItemCollection = initial => {
  const out = Object.create(ItemCollectionTraits)
  out.items = initial.reduce((acc, x) => {
    acc[x.name] = x
    return acc
  }, {})
  return out
}

const LibraryTraits = {
  addItem(item) {
    this.items.add(item)
    this.loadingItems.remove(item.name)
    this.errors.remove(item.name)
    return this
  },

  size() { return this.items.size() + this.loadingItems.size() + this.errors.size() },
  item(name) { return this.items.get(name) },
  loadingItem(name) { return this.loadingItems.get(name) },
  error(name) { return this.errors.get(name) },

  mapItems(f) {
    return this.items.map(f)
  },

  mapLoading(f) {
    return this.loadingItems.map(f)
  },

  mapErrors(f) {
    return this.errors.map(f)
  }
}

export default (items, loading) => {
  const out = Object.create(LibraryTraits)
  out.items = ItemCollection(items) || ItemCollection([])
  out.loadingItems = ItemCollection(loading) || ItemCollection([])
  out.errors = ItemCollection([])
  return out
}
