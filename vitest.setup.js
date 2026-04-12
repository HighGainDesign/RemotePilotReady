// Create a proper localStorage implementation for testing
const createStorage = () => {
  const store = {}
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = String(value)
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((key) => {
        delete store[key]
      })
    },
    key: (index) => {
      const keys = Object.keys(store)
      return keys[index] ?? null
    },
    get length() {
      return Object.keys(store).length
    },
  }
}

// Replace localStorage globally
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: createStorage(),
    writable: true,
    configurable: true,
  })
}

// Also for global context if window doesn't exist
if (typeof global !== 'undefined' && !global.localStorage) {
  global.localStorage = createStorage()
}
